---
title: useDeployedContractInfo
description: Fetch ABI and address of deployed contracts.
---

# useDeployedContractInfo

Use this hook to fetch details about a deployed smart contract, including the ABI and address.

```ts
const { data: deployedContractData } = useDeployedContractInfo({ contractName: "YourContract" });
```

This example retrieves the details of the deployed contract with the specified name and stores the details in the `deployedContractData` object.

## Configuration

| Parameter              | Type     | Description                                                                                                                |
| :--------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------- |
| **contractName**       | `string` | Name of the contract.                                                                                                      |
| **chainId** (optional) | `string` | Id of the chain the contract lives on. Defaults to [`targetNetworks[0].id`](/deploying/deploy-nextjs-app#--targetnetworks) |

### Return Value

- `data`: Object containing `address`, `abi` and `deployedOnBlock` of the contract.
