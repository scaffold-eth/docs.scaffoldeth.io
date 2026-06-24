---
title: useScaffoldWatchContractEvent
description: Subscribe to real-time smart contract events.
---

# useScaffoldWatchContractEvent

Use this hook to subscribe to events emitted by your smart contract, and receive real-time updates when these events are emitted.

```ts
useScaffoldWatchContractEvent({
  contractName: "YourContract",
  eventName: "GreetingChange",
  // The onLogs function is called whenever a GreetingChange event is emitted by the contract.
  // Parameters emitted by the event can be destructed using the below example
  // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  onLogs: (logs) => {
    logs.map((log) => {
      const { greetingSetter, value, premium, newGreeting } = log.args;
      console.log("📡 GreetingChange event", greetingSetter, value, premium, newGreeting);
    });
  },
});
```

This example subscribes to the `GreetingChange` event emitted by the `YourContract` smart contract and logs the parameters from the event to the console when it's emitted.

This hook is a wrapper around wagmi's [useWatchContractEvent](https://wagmi.sh/react/api/hooks/useWatchContractEvent).

:::note
Due to shortcomings of some RPC providers, this hook may or may not fire events always [checkout this discussion](https://github.com/wevm/wagmi/issues/3883) for more details. To update the RPC link checkout [this section](/deploying/deploy-nextjs-app#--alchemyapikey)
:::

## Configuration

| Parameter              | Type       | Description                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **contractName**       | `string`   | Name of the contract to read from.                                                                                                                                                                                                                                                                                                                                                    |
| **eventName**          | `string`   | Name of the event to read.                                                                                                                                                                                                                                                                                                                                                            |
| **onLogs**             | `function` | Callback function to execute when the event is emitted. Accepts an array of `logs` that occurred during the [`pollingInterval`](/deploying/deploy-nextjs-app#--pollinginterval) set at `scaffold.config.ts`. Each array item contains an `args` property, which can be destructured to get the parameters emitted by the event. This function can customized according to your needs. |
| **chainId** (optional) | `string`   | Id of the chain the contract lives on. Defaults to [`targetNetworks[0].id`](/deploying/deploy-nextjs-app#--targetnetworks)                                                                                                                                                                                                                                                            |

:::note
It is recommended to `setState` using [updater function](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) in the `onLogs` function to avoid problems due to caching.
:::
