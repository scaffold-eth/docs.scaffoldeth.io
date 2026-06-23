import React from "react";

export default function Footer() {
  return (
    <div
      style={{
        borderTop: "1px solid var(--vocs-color-border)",
        marginTop: "40px",
        paddingTop: "40px",
        paddingBottom: "40px",
        fontSize: "14px",
        color: "var(--vocs-color-text-2)", // Muted text color
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "40px",
          maxWidth: "100%",
        }}
      >
        {/* Column 1: Built With */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "var(--vocs-color-text)",
              margin: 0,
            }}
          >
            Built with ♥ at BuidlGuidl
          </h4>
          <a
            href="https://buidlguidl.com"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            BuidlGuidl Website
          </a>
          <a
            href="https://twitter.com/buidlguidl"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            BuidlGuidl Twitter
          </a>
        </div>

        {/* Column 2: GitHub */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "var(--vocs-color-text)",
              margin: 0,
            }}
          >
            GitHub
          </h4>
          <a
            href="https://github.com/scaffold-eth/scaffold-eth-2"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            Scaffold-Eth 2 GitHub ↗
          </a>
          <a
            href="https://github.com/scaffold-eth/docs.scaffoldeth.io"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            Docs GitHub ↗
          </a>
        </div>

        {/* Column 3: Social */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "var(--vocs-color-text)",
              margin: 0,
            }}
          >
            Social
          </h4>
          <a
            href="https://twitter.com/ScaffoldETH"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            Twitter ↗
          </a>
          <a
            href="https://t.me/+GCApAirsRNBlN2Yx"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            Telegram ↗
          </a>
          <a
            href="https://www.youtube.com/c/austingriffith"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            Youtube ↗
          </a>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          fontSize: "12px",
          opacity: 0.6,
        }}
      >
        Copyright © {new Date().getFullYear()} Scaffold-eth Docs. Built with
        Vocs.
      </div>
    </div>
  );
}

// Simple hover effect helper
const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  transition: "opacity 0.2s",
  opacity: 0.8,
};
