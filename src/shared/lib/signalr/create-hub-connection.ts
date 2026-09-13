// shared/lib/signalr/create-hub-connection.ts
"use client";

import {
  HubConnectionBuilder,
  HubConnection,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";

/**
 * Creates a SignalR connection to a hub path under NEXT_PUBLIC_API_URL.
 * Token is passed as access_token query (matches backend JwtBearer OnMessageReceived).
 */
export function createHubConnection(
  hubPath: string,
  accessToken: string,
): HubConnection {
  const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  const url = `${base}${hubPath.startsWith("/") ? hubPath : `/${hubPath}`}`;

  return new HubConnectionBuilder()
    .withUrl(url, {
      accessTokenFactory: () => accessToken,
      transport: HttpTransportType.WebSockets,
      skipNegotiation: false,
    })
    .withAutomaticReconnect([0, 2000, 5000, 10000, 30000])
    .configureLogging(LogLevel.Information)
    .build();
}
