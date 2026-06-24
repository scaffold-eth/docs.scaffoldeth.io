import type { ReactNode } from "react";

// Site-wide head injection. React 19 hoists the async <script> into <head>;
// the inline script seeds the Plausible queue and calls plausible.init().
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        async
        src="https://plausible.io/js/pa-d22-c9SXWUaRHTRe7b4Uu.js"
      />
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: analytics snippet
        dangerouslySetInnerHTML={{
          __html:
            "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
        }}
      />
      {children}
    </>
  );
}
