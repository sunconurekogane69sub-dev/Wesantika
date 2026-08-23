"use client";

import { useEffect } from "react";

/**
 * The last boundary: a throw in the root layout itself.
 *
 * It replaces the whole document, which is why it renders its own `<html>` and
 * `<body>` — by the time this runs, the layout that would normally provide them
 * is the thing that failed. That also means **none of the app is available**:
 * no locale context, no dictionary, no fonts, no `globals.css`. Importing any
 * of it would risk re-entering the failure this is meant to contain.
 *
 * So the styling is inline and the copy is English. That is a deliberate floor,
 * not laziness: this renders only when the layout is broken, which on a site of
 * static pages means a deployment is broken, and the useful thing then is a
 * page that cannot itself fail. `[locale]/error.tsx` is the one that gets to be
 * branded and translated, and it handles every error that is not this one.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[global error]", error.digest ?? error.message, error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#041d38",
          color: "#ffffff",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <main style={{ maxWidth: "480px" }}>
          <h1 style={{ margin: 0, fontSize: "28px", lineHeight: 1.25 }}>
            Something went wrong
          </h1>
          <p
            style={{
              margin: "16px 0 28px",
              fontSize: "16px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Wesantika could not load this page. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              cursor: "pointer",
              border: 0,
              borderRadius: "14px",
              padding: "13px 26px",
              fontSize: "16px",
              fontWeight: 700,
              color: "#ffffff",
              background: "#0b62bd",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
