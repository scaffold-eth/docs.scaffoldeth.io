---
title: useScaffoldReadContract
description: Read data from smart contract functions.
---

# useScaffoldReadContract

Use this hook to read public variables and get data from read-only functions of your smart contract.

```ts
const { data: totalCounter } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "userGreetingCounter",
  args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
});
```

This example retrieves the data returned by the `userGreetingCounter` function of the `YourContract` smart contract.

## Configuration

| Parameter              | Type        | Description                                                                                                                |
| :--------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------- |
| **contractName**       | `string`    | Name of the contract to read from.                                                                                         |
| **functionName**       | `string`    | Name of the function to call.                                                                                              |
| **args** (optional)    | `unknown[]` | Array of arguments to pass to the function (if accepts any). Types are inferred from contract's function parameters        |
| **watch** (optional)   | `boolean`   | Watches and refreshes data on new blocks. (default : `true`)                                                               |
| **chainId** (optional) | `string`    | Id of the chain the contract lives on. Defaults to [`targetNetworks[0].id`](/deploying/deploy-nextjs-app#--targetnetworks) |

You can also pass other arguments accepted by [useReadContract wagmi hook](https://wagmi.sh/react/api/hooks/useReadContract#parameters).

## Return Values

- The retrieved data is stored in the `data` property of the returned object.
- You can refetch the data by calling the `refetch` function.
- The extended object includes properties inherited from wagmi useReadContract. You can check the [useReadContract return values](https://wagmi.sh/react/api/hooks/useReadContract#return-type) documentation to check the types.
