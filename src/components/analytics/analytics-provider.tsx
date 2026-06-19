import Script from "next/script";

import {
  ANALYTICS_ENABLED,
  ANALYTICS_ID,
  PLAUSIBLE_DOMAIN,
} from "@/lib/constants";

export function AnalyticsProvider() {
  if (!ANALYTICS_ENABLED) {
    return null;
  }

  return (
    <>
      {PLAUSIBLE_DOMAIN ? (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
      {ANALYTICS_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${JSON.stringify(ANALYTICS_ID)});
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
