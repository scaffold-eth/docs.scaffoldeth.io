---
title: External Contracts
description: Interact with contracts not deployed by your SE-2 instance.
---

# 📡 Interacting with External Contracts

If you need to interact with external contracts (i.e. not deployed with your SE-2 instance, e.g [`DAI`](https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#code) contract) you can add external contract data to your `packages/nextjs/contracts/externalContracts.ts` file, which would let you use Scaffold-ETH 2 [custom hooks](/hooks).

To achieve this, include the contract name, its `address`, and `abi` in `externalContracts.ts` for each chain ID. Ensure to update the [`targetNetworks`](/deploying/deploy-nextjs-app#--targetnetworks) in `scaffold.config.ts` to your preferred chains to enable hooks typescript autocompletion.

This is the structure of `externalContracts` object:

```ts
const externalContracts = {
  1: {
    DAI: {
      address: "0x...",
      abi: [...],
    },
    WETH: {
      address: "0x...",
      abi: [...],
    },
  },
  5: {
    DAI: {
      address: "0x...",
      abi: [...],
    },
    WETH: {
      address: "0x...",
      abi: [...],
    },
  },
} as const;
```

