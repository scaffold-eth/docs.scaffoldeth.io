---
title: EtherInput
description: Input field for ETH amounts with USD toggle.
---

# EtherInput

Displays an input field for ETH/USD amount, with an option to convert between ETH and USD.

![EtherInput Example](/img/EtherInput.gif)

## Import

```tsx
import { EtherInput } from "@scaffold-ui/components";
```

## Usage

```tsx
const [ethAmount, setEthAmount] = useState("");
```

```tsx
<EtherInput onValueChange={({ valueInEth, valueInUsd, displayUsdMode }) => setEthAmount(valueInEth)} />
```

## Props

| Prop                          | Type                                                                                   | Default Value | Description                                                                              |
| ----------------------------- | -------------------------------------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| **defaultValue** (optional)   | `string`                                                                               | `undefined`   | Initial value for the input (in ETH).                                                    |
| **defaultUsdMode** (optional) | `boolean`                                                                              | `false`       | When set to `true`, the input starts in USD mode instead of ETH.                         |
| **onValueChange** (optional)  | `(value: { valueInEth: string; valueInUsd: string; displayUsdMode: boolean }) => void` | `undefined`   | Callback fired when the value or display mode changes. Provides both ETH and USD values. |
| **placeholder** (optional)    | `string`                                                                               | `undefined`   | The string that will be rendered when there is no input value.                           |
| **name** (optional)           | `string`                                                                               | `undefined`   | Helps identify the data being sent if EtherInput is submitted into a form.               |
| **disabled** (optional)       | `boolean`                                                                              | `false`       | When set to `true`, changes input background color and border to have disabled styling.  |
| **style** (optional)          | `CSSProperties`                                                                        | `undefined`   | Custom CSS styles to apply to the component.                                             |

:::tip[Scaffold-UI]
For more details on customization and theming, check the [Scaffold-UI EtherInput docs](https://scaffold-ui-docs.vercel.app/components/EtherInput).
:::
