// shared/lib/signalr/hub-connection-manager.ts
"use client";

import {
  HubConnectionBuilder,
  HubConnection,
  HubConnectionState,
  HttpTransportType,
  LogLevel,
} from "@microsoft/signalr";

interface ManagedEntry {
  connection: HubConnection;
  refCount: number;
  connectPromise: Promise<void> | null;
  releaseTimer: ReturnType<typeof setTimeout> | null;
}

/** How long a connection survives after its last subscriber releases it.
 *  Absorbs quick remounts (StrictMode, fast back/forward navigation)
 *  without tearing down and re-negotiating the WebSocket. */
const RELEASE_GRACE_MS = 3000;

function buildUrl(hubPath: string): string {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  const path = hubPath.startsWith("/") ? hubPath : `/${hubPath}`;
  return `${base}${path}`;
}

/**
 * Shares one HubConnection per (hub path + access token) across every
 * caller that acquires it, instead of each component opening its own
 * socket. Callers are explicit about the lifecycle: nothing connects
 * until `acquire()` is called, and the connection only closes once every
 * acquirer has `release()`d it.
 */
class HubConnectionManager {
  private readonly entries = new Map<string, ManagedEntry>();

  private keyFor(hubPath: string, accessToken: string): string {
    return `${hubPath}::${accessToken}`;
  }

  /**
   * Acquires a reference to the shared connection, connecting it if this is
   * the first (or first-since-release) caller. Safe to call concurrently —
   * every caller awaits the same in-flight `start()`.
   */
  async acquire(hubPath: string, accessToken: string): Promise<HubConnection> {
    const key = this.keyFor(hubPath, accessToken);
    let entry = this.entries.get(key);

    if (!entry) {
      const connection = new HubConnectionBuilder()
        .withUrl(buildUrl(hubPath), {
          accessTokenFactory: () => accessToken,
          transport: HttpTransportType.WebSockets,
          skipNegotiation: false,
        })
        .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
        .configureLogging(LogLevel.Warning)
        .build();

      entry = { connection, refCount: 0, connectPromise: null, releaseTimer: null };
      this.entries.set(key, entry);
    }

    if (entry.releaseTimer) {
      clearTimeout(entry.releaseTimer);
      entry.releaseTimer = null;
    }
    entry.refCount += 1;

    if (
      entry.connection.state === HubConnectionState.Disconnected &&
      !entry.connectPromise
    ) {
      entry.connectPromise = entry.connection.start().finally(() => {
        entry!.connectPromise = null;
      });
    }

    if (entry.connectPromise) {
      await entry.connectPromise;
    }

    return entry.connection;
  }

  /**
   * Releases one reference. The connection is only stopped once refCount
   * hits zero and stays there for RELEASE_GRACE_MS.
   */
  release(hubPath: string, accessToken: string): void {
    const key = this.keyFor(hubPath, accessToken);
    const entry = this.entries.get(key);
    if (!entry) return;

    entry.refCount = Math.max(0, entry.refCount - 1);
    if (entry.refCount > 0) return;

    entry.releaseTimer = setTimeout(() => {
      const current = this.entries.get(key);
      if (!current || current.refCount > 0) return;
      this.entries.delete(key);
      current.connection.stop().catch(() => undefined);
    }, RELEASE_GRACE_MS);
  }
}

export const hubConnectionManager = new HubConnectionManager();