---
title: AGENTS.md
description: How AGENTS.md gives AI coding agents context about your Scaffold-ETH 2 project.
---

# AGENTS.md

`AGENTS.md` is a markdown file at the root of every Scaffold-ETH 2 project. It gives AI coding agents structured context about your project: architecture, commands, code style, and available skills. The agent reads it when it enters your project directory so it can write correct code without guessing.

Most AI coding tools (Claude Code, Cursor, Cline) automatically read this file when they enter your project directory.

:::info
To see the full file, open `AGENTS.md` in the root of a project created with `npx create-eth@latest`.
:::

## Customizing AGENTS.md

You can extend `AGENTS.md` as your project grows. Add sections for your custom contracts, project-specific patterns, API integrations, or deployment targets which model keeps getting wrong.
