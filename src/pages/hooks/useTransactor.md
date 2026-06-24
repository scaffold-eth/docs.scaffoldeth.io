---
title: useTransactor
description: Handle transactions with built-in UI feedback.
---

# useTransactor

Use this hook to interact with the chain and give UI feedback on the transaction status.

![Transaction success](/img/transactorSuccess.gif)

Any error will instead show a popup with nice error message.

![Error Example](/img/transactorFail.gif)

```ts
const transactor = useTransactor();
const writeTx = transactor({
  to: "0x97843608a00e2bbc75ab0C1911387E002565DEDE", // address of buidlguidl.eth
  value: 1000000000000000000n,
});
await writeTx();
```

This example tries to send 1 ETH to the address `buidlguidl.eth`, prompting the connected [`WalletClient`](https://viem.sh/docs/clients/wallet) for a signature. And in the case of a successful transaction, it will show a popup in the UI with the message: "🎉 Transaction completed successfully!".

You can pass in anything that is a valid parameter to [Viem's `sendTransaction` function](https://viem.sh/docs/actions/wallet/sendTransaction#parameters) to callback function. It also possible to pass it an promise that resolves in with a transaction hash for example promise from [Wagmi's `writeContractAsync` function](https://wagmi.sh/react/api/hooks/useWriteContract#mutate-async).

[Refer to this recipe](/recipes/WriteToContractWriteAsyncButton) for a more detailed example.

## Configuration

### useTransactor

| Parameter                     | Type                                                                | Description                                                                                                                                                                       |
| :---------------------------- | :------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **\_walletClient** (optional) | [`WalletClient`](https://viem.sh/docs/clients/wallet#wallet-client) | The wallet client that should sign the transaction. Defaults to the connected wallet client, and is only needed if the transaction is not already sent using `writeContractAsync` |

### callback function

| Parameter                                    | Type                                                                                                              | Description                                                                                                                                                                                                                                                                                    |
| :------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **tx**                                       | [`sendTransaction`-parameters](https://viem.sh/docs/actions/wallet/sendTransaction#parameters) or `Promise<Hash>` | Either valid parameters for [`sendTransaction`-parameters](https://viem.sh/docs/actions/wallet/sendTransaction#parameters) or a promise that resolves with the transaction hash, e.g. [Wagmi's `writeContractAsync` function](https://wagmi.sh/react/api/hooks/useWriteContract#mutate-async). |
| **options** (optional)                       | `object`                                                                                                          | Additional options for the confirmation.                                                                                                                                                                                                                                                       |
| **└─options.blockConfirmations** (optional)  | `number`                                                                                                          | The number of block confirmations to wait for before resolving. Defaults to 1.                                                                                                                                                                                                                 |
| **└─options.onBlockConfirmation** (optional) | `function`                                                                                                        | A callback function that is called once all `blockConfirmations` is reached.                                                                                                                                                                                                                   |

## Return Values

### useTransactor

- The callback function that is used to initialize the UI feedback flow.

### callback function

- A promise that resolves with the transaction hash once the transaction is mined.
