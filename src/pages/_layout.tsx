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
      {/* Points AI agents at the docs index on every page. These are Tailwind's
          sr-only values inlined, since vocs doesn't ship the class to our pages.
          Hidden without display:none so it survives HTML-to-markdown conversion. */}
      <div
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clipPath: "inset(50%)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        For AI agents: a full documentation index is available at{" "}
        <a href="/llms.txt">/llms.txt</a>.
      </div>
      {children}
    </>
  );
}
