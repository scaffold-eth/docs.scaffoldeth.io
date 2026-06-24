---
title: Hooks
description: Custom React hooks for seamless smart contract interactions.
---

# 🛠 Interacting with Your Smart Contracts

Scaffold-ETH 2 provides a collection of custom React hooks designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around Wagmi, an easy-to-use interface with typescript autocompletions for reading from, writing to, and monitoring events emitted by your smart contracts.

To ensure autocompletions function correctly, always update the [`targetNetworks` ](/deploying/deploy-nextjs-app#--targetnetworks) in `scaffold.config.ts` to include the relevant network/chain whenever you deploy your contract using [`yarn deploy --network`](/deploying/deploy-smart-contracts#3-deploy-your-smart-contracts).

:::info
The custom hooks rely on three main files for their functionality and TypeScript autocompletion:

- `packages/nextjs/contracts/deployedContracts.ts`
- [`packages/nextjs/contracts/externalContracts.ts`](/external-contracts)
- `scaffold.config.ts`

The `deployedContracts.ts` file is auto-generated/updated whenever you run `yarn deploy --network`. It organizes contract addresses and abi's based on chainId.
:::

:::note
When having multiple chains configured in [`targetNetworks`](/deploying/deploy-nextjs-app#--targetnetworks), make sure to have same contractName's on other chains as `targetNetworks[0].id`.This ensures proper functionality and autocompletion of custom hooks, as the current setup and types assumes that same contract's are present on other chains as `targetNetworks[0]`.
:::
