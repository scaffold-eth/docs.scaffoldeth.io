---
title: useScaffoldWriteContract
description: Send transactions to smart contract functions.
---

# useScaffoldWriteContract

Use this hook to send a transaction to your smart contract to write data or perform an action.

```ts
const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract({ contractName: "YourContract" });
```

The following configuration options can be passed to the hook:

## Configuration

| Parameter                          | Type     | Description                                                                                                                |
| :--------------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- |
| **contractName**                   | `string` | Name of the contract to write to.                                                                                          |
| **chainId** (optional)             | `string` | Id of the chain the contract lives on. Defaults to [`targetNetworks[0].id`](/deploying/deploy-nextjs-app#--targetnetworks) |
| **writeContractParams** (optional) | `object` | wagmi's `useWriteContract` hook [parameters object](https://wagmi.sh/react/api/hooks/useWriteContract#parameters)          |

To send the transaction, you can call the `writeContractAsync` function returned by the hook (which we instance as `writeYourContractAsync`). Here's an example usage:

```tsx
<button
  className="btn btn-primary"
  onClick={async () => {
    try {
      await writeYourContractAsync({
        functionName: "setGreeting",
        args: ["The value to set"],
        value: parseEther("0.1"),
      });
    } catch (e) {
      console.error("Error setting greeting:", e);
    }
  }}
>
  Set Greeting
</button>
```

This example sends a transaction to the `YourContract` smart contract to call the `setGreeting` function with the arguments passed in `args`. The `writeContractAsync` function (`writeYourContractAsync` instance) sends the transaction to the smart contract.

Below is the configuration for `writeContractAsync` function:

## Configuration

| Parameter                          | Type        | Description                                                                                                          |
| :--------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------- |
| **functionName**                   | `string`    | Name of the function to call.                                                                                        |
| **args** (optional)                | `unknown[]` | Array of arguments to pass to the function (if accepts any). Types are inferred from contract's function parameters. |
| **value** (optional)               | `bigint`    | Amount of ETH to send with the transaction (for payable functions only).                                             |
| **onBlockConfirmation** (optional) | `function`  | Callback function to execute when the transaction is confirmed.                                                      |
| **blockConfirmations** (optional)  | `number`    | Number of block confirmations to wait for before considering transaction to be confirmed (default : 1).              |

You can also pass other arguments accepted by [writeContractAsync from wagmi](https://wagmi.sh/react/api/hooks/useWriteContract#mutate-async).

## Return Values

- `writeContractAsync` function sends the transaction to the smart contract.
- `isMining` property indicates whether the transaction is currently being mined.
- The extended object includes properties inherited from wagmi useWriteContract. You can check the [useWriteContract return values](https://wagmi.sh/react/api/hooks/useWriteContract#return-type) documentation to check the types.
