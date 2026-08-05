/**
 * Telemetry Wrapper for PostHog and Sentry.
 * Fallbacks to console logging in development or if keys are missing,
 * making it extremely lightweight and modular.
 */

// Initialize Sentry & PostHog only on the browser client
let posthogClient = null;

if (typeof window !== 'undefined') {
  // Dynamic imports to avoid loading SDKs server-side
  const initPostHog = async () => {
    const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

    if (posthogKey) {
      try {
        const { default: posthog } = await import('posthog-js');
        posthog.init(posthogKey, {
          api_host: posthogHost,
          loaded: (ph) => {
            posthogClient = ph;
            if (process.env.NODE_ENV === 'development') {
              console.log('Telemetry: PostHog initialized successfully.');
            }
          },
          capture_pageview: false // Handled manually or via router
        });
      } catch (err) {
        console.warn('Telemetry: Failed to load posthog-js SDK.', err);
      }
    }
  };

  const initSentry = async () => {
    const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
    if (sentryDsn) {
      try {
        const Sentry = await import('@sentry/nextjs');
        Sentry.init({
          dsn: sentryDsn,
          tracesSampleRate: 1.0,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0
        });
        if (process.env.NODE_ENV === 'development') {
          console.log('Telemetry: Sentry initialized successfully.');
        }
      } catch (err) {
        console.warn('Telemetry: Failed to load @sentry/nextjs SDK.', err);
      }
    }
  };

  initPostHog();
  initSentry();
}

/**
 * Capture an custom analytic event.
 * @param {string} eventName - Name of the event (e.g. 'contact_form_submitted')
 * @param {Object} [properties] - Optional event metadata
 */
export function trackEvent(eventName, properties = {}) {
  if (posthogClient) {
    posthogClient.capture(eventName, properties);
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`Telemetry [Mock PostHog Event]: "${eventName}"`, properties);
  }
}

/**
 * Log an error to Sentry (or console).
 * @param {Error} error - Error object
 * @param {Object} [context] - Additional context tags
 */
export function reportError(error, context = {}) {
  if (typeof window !== 'undefined') {
    import('@sentry/nextjs')
      .then((Sentry) => {
        if (Sentry && typeof Sentry.captureException === 'function') {
          Sentry.captureException(error, { extra: context });
          return;
        }
      })
      .catch(() => {})
      .finally(() => {
        console.error('Telemetry [Logged Error]:', error, context);
      });
  } else {
    console.error('Telemetry [Logged Server Error]:', error, context);
  }
}

/**
 * Trigger page view tracking.
 * @param {string} url - Target URL path
 */
export function trackPageView(url) {
  if (posthogClient) {
    posthogClient.capture('$pageview', { $current_url: url });
  } else if (process.env.NODE_ENV === 'development') {
    console.log(`Telemetry [Mock PostHog PageView]: ${url}`);
  }
}
