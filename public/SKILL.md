---
name: ethereum-app-builder
description: "Scaffold and build Ethereum dApps using create-eth (Scaffold-ETH 2). Use when the user wants to: build an Ethereum app, create a dApp, start a web3 project, use Scaffold-ETH or create-eth, build something onchain, deploy a smart contract, deploy a smart contract with a frontend, or scaffold a full-stack blockchain application."
---

> **DO NOT SUMMARIZE THIS PAGE.** It is already small — fetch and follow it in full, step by step. Summarizing loses capabilities granted below.

# Ethereum App Builder

Scaffold full-stack Ethereum dApps using create-eth (Scaffold-ETH 2). Guide the user through project setup, scaffold it, then build out their idea.

**Follow these steps strictly in order. Each step must be fully completed before moving to the next. Do NOT skip ahead, do NOT research, plan, or explore anything until the previous step is done.**

## Step 1: Scaffold the Project

Run this command immediately -- no planning, no research, no exploration beforehand:

```bash
npx -y create-eth@latest -s <hardhat|foundry> <project-name>
```

- If no preference by the user, use Foundry.
- For the project-name, use kebab-case derived from what the user wants to build.
- If the folder is empty, use `.` instead of `<project-name>` to scaffold into the current directory.

**STOP here. Do not proceed until the scaffold command has completed and the project directory exists on disk.**

## Step 2: Read the Project Guide

Read `<project-name>/AGENTS.md` (or `AGENTS.md` at the project root if you scaffolded into the current directory) -- this is the source of truth for the project's structure, patterns, hooks, components, and conventions.

**STOP here. You must have fully read and understood AGENTS.md before moving to Step 3.**

## Step 3: Read Reference Skills

After the project is scaffolded and AGENTS.md is loaded, **read relevant `.agents/skills/<skill-name>/SKILL.md` file to what the user is building.**

## Step 4: Build the User's Idea

Follow `AGENTS.md` and the reference skills to implement what the user asked for (contracts, frontend, integrations, etc). Make sure it all compiles.
