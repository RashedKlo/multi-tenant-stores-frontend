"use client";

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export type GoogleCredentialCallback = (idToken: string) => void;

type GooglePromptNotification = {
  isNotDisplayed: () => boolean;
  isSkippedMoment: () => boolean;
  isDismissedMoment: () => boolean;
  getNotDisplayedReason: () => string;
  getSkippedReason: () => string;
  getDismissedReason: () => string;
};

type GoogleIdentityServices = {
  accounts: {
    id: {
      initialize: (config: {
        client_id: string;
        callback: (response: { credential?: string }) => void;
        auto_select?: boolean;
        cancel_on_tap_outside?: boolean;
        context?: "signin" | "signup" | "use";
        use_fedcm_for_prompt?: boolean;
      }) => void;

      prompt: (
        momentListener?: (notification: GooglePromptNotification) => void,
      ) => void;

      cancel: () => void;
    };
  };
};

declare global {
  interface Window {
    google?: GoogleIdentityServices;
  }
}

let googleReadyPromise: Promise<boolean> | null = null;
let credentialCallback: GoogleCredentialCallback | null = null;

function isGoogleGisReady(): boolean {
  return Boolean(window.google?.accounts?.id);
}

/**
 * Wait for Google's Identity Services SDK to become available.
 *
 * The promise is cached so multiple components can safely wait for the
 * same SDK initialization instead of creating multiple polling loops.
 */
function waitForGoogle(maxMs = 8000): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (isGoogleGisReady()) {
    return Promise.resolve(true);
  }

  if (googleReadyPromise) {
    return googleReadyPromise;
  }

  googleReadyPromise = new Promise<boolean>((resolve) => {
    const start = Date.now();

    const intervalId = window.setInterval(() => {
      if (isGoogleGisReady()) {
        window.clearInterval(intervalId);
        resolve(true);
        return;
      }

      if (Date.now() - start >= maxMs) {
        window.clearInterval(intervalId);
        resolve(false);
      }
    }, 100);
  });

  return googleReadyPromise;
}

/**
 * Initialize Google Identity Services.
 *
 * Safe to call multiple times. The callback is kept at module scope so
 * Google's SDK always invokes the latest application callback.
 */
export async function initGoogleGis(
  onCredential: GoogleCredentialCallback,
  options: {
    context?: "signin" | "signup";
  } = {},
): Promise<boolean> {
  if (!CLIENT_ID || typeof window === "undefined") {
    return false;
  }

  const ready = await waitForGoogle();

  if (!ready || !window.google?.accounts?.id) {
    return false;
  }

  credentialCallback = onCredential;

  window.google.accounts.id.initialize({
    client_id: CLIENT_ID,

    callback: (response) => {
      const token = response.credential;

      if (!token) {
        return;
      }

      credentialCallback?.(token);
    },

    auto_select: false,
    cancel_on_tap_outside: true,
    context: options.context ?? "signin",
  });

  return true;
}

/**
 * Show Google's One Tap / account chooser prompt.
 */
export function promptGoogleOneTap(
  onMoment?: (info: {
    shown: boolean;
    reason?: string;
  }) => void,
): void {
  if (!isGoogleGisReady()) {
    onMoment?.({
      shown: false,
      reason: "gis_not_ready",
    });

    return;
  }

  window.google!.accounts.id.prompt((notification) => {
    if (notification.isNotDisplayed()) {
      onMoment?.({
        shown: false,
        reason: notification.getNotDisplayedReason(),
      });

      return;
    }

    if (notification.isSkippedMoment()) {
      onMoment?.({
        shown: false,
        reason: notification.getSkippedReason(),
      });

      return;
    }

    if (notification.isDismissedMoment()) {
      onMoment?.({
        shown: false,
        reason: notification.getDismissedReason(),
      });

      return;
    }

    onMoment?.({
      shown: true,
    });
  });
}

/**
 * Cancel an active Google One Tap prompt.
 */
export function cancelGoogleOneTap(): void {
  window.google?.accounts?.id?.cancel();
}

/**
 * Whether Google OAuth has been configured.
 */
export function hasGoogleClientId(): boolean {
  return Boolean(CLIENT_ID);
}