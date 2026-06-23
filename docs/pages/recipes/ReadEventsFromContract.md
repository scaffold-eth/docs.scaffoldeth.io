---
sidebar_position: 6
title: Read and display contract events
description: Learn how to fetch and display smart contract events in your dApp.
---

# Read and display contract events

This recipe shows how to fetch and display events emitted by your smart contract using the [useScaffoldEventHistory](/hooks/useScaffoldEventHistory) hook. You'll learn how to efficiently query, listen, parse, and render contract events in your UI, and see how to extend your project with production-grade event indexing using Subgraph or Ponder.

:::caution Performance Considerations
The `useScaffoldEventHistory` hook is primarily designed for **local development** (hardhat/anvil chains). Using it in production environments(mainnet or L2 chains), can cause performance issues and excessive RPC usage. For production applications, consider using specialized indexing solutions like [Subgraph](#next-steps) or [Ponder](#next-steps) instead.
:::caution

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const ContractEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    // fromBlock defaults to deployedOnBlock if available (block number of the contract deployment)
    watch: true, // Defaults to false. Set to true to listen for new events in real-time
    blockData: true,
  });

  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;

  return (
    <div>
      <h2>GreetingChange Events</h2>
      <ul>
        {events?.map(event => (
          <li key={`${event.transactionHash}-${event.logIndex}`}>
            <p>Setter: {event.args?.greetingSetter}</p>
            <p>Greeting: {event.args?.newGreeting}</p>
            <p>Premium: {event.args?.premium}</p>
            <p>Value: {event.args?.value}</p>
            <p>Block: {event.block?.number?.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

</details>

## Implementation guide

### Step 1: Create a new Component

Create a new component in the "components" folder of your application.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";

export const ContractEvents = () => {
  return <div>Contract Events will be displayed here.</div>;
};
```

### Step 2: Initialize the `useScaffoldEventHistory` hook

Import and initialize the `useScaffoldEventHistory` hook to fetch events. By default, the hook will start fetching from the block the contract was deployed (`deployedOnBlock`), so you don’t need to specify `fromBlock` unless you want to override it.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
// highlight-start
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
// highlight-end

export const ContractEvents = () => {
  // highlight-start
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    watch: true,
    blockData: true,
  });
  // highlight-end
  return <div>Contract Events will be displayed here.</div>;
};
```

### Step 3: Display the Events

Render the events in your UI. Adjust the argument names to match your contract's event signature.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const ContractEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    watch: true,
    blockData: true,
  });
  // highlight-start
  return (
    <div>
      <h2>GreetingChange Events</h2>
      <ul>
        {events?.map(event => (
          <li key={`${event.transactionHash}-${event.logIndex}`}>
            <p>Setter: {event.args?.greetingSetter}</p>
            <p>Greeting: {event.args?.newGreeting}</p>
            <p>Premium: {event.args?.premium}</p>
            <p>Value: {event.args?.value}</p>
            <p>Block: {event.block?.number?.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  // highlight-end
};
```

### Step 4: Bonus handle Loading and Error states

Show feedback to the user while events are loading or if an error occurs.

```tsx title="components/ContractEvents.tsx"
import * as React from "react";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export const ContractEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "GreetingChange",
    watch: true,
    blockData: true,
  });

  // highlight-start
  if (isLoading) return <div>Loading events...</div>;
  if (error) return <div>Error loading events: {error.message}</div>;
  // highlight-end

  return (
    <div>
      <h2>GreetingChange Events</h2>
      <ul>
        {events?.map(event => (
          <li key={`${event.transactionHash}-${event.logIndex}`}>
            <p>Setter: {event.args?.greetingSetter}</p>
            <p>Greeting: {event.args?.newGreeting}</p>
            <p>Premium: {event.args?.premium}</p>
            <p>Value: {event.args?.value}</p>
            <p>Block: {event.block?.number?.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

## Next Steps

- **Subgraph (The Graph):** For advanced, production-grade event indexing and GraphQL querying, use the [Subgraph extension](https://github.com/scaffold-eth/create-eth-extensions/tree/subgraph). Install with:

  ```sh
  npx create-eth@latest -e subgraph
  ```

  See the extension docs for setup and deployment.

- **Ponder:** For a TypeScript-first, flexible event indexer suitable for both local development and production, use the [Ponder extension](https://github.com/scaffold-eth/create-eth-extensions/tree/ponder). Install with:
  ```sh
  npx create-eth@latest -e ponder
  ```
  See the extension docs for configuration and usage.

Both tools let you efficiently index and query contract events at scale. Choose the one that best fits your stack and workflow.
