---
title: AGENTS.md
description: How AGENTS.md gives AI coding agents context about your Scaffold-ETH 2 project.
---

# AGENTS.md

`AGENTS.md` is a markdown file at the root of every Scaffold-ETH 2 project. It gives AI coding agents structured context about your project: architecture, commands, code style, and available skills. The agent reads it when it enters your project directory so it can write correct code without guessing.

Most AI coding tools (Claude Code, Cursor, Cline) automatically read this file when they enter your project directory.

:::info
View the full file on GitHub: [`scaffold-eth-2/AGENTS.md`](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/AGENTS.md)
:::

## Customizing AGENTS.md

You can extend `AGENTS.md` as your project grows. Add sections for your custom contracts, project-specific patterns, API integrations, or deployment targets which model keeps getting wrong.
