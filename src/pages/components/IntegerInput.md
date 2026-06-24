---
title: IntegerInput
description: Input field for integer values with wei conversion.
---

# IntegerInput

Provides an input field for integer values, validating that user input is a valid integer, and showing error if not.  
Shows by default a small button to multiply input's value \* 10^18 to transform to wei.

![IntegerInput Example](/img/integerInput.png)

## Import

```tsx
import { IntegerInput } from "@scaffold-ui/debug-contracts";
```

## Usage

```tsx
const [txValue, setTxValue] = useState("");
```

```tsx
<IntegerInput
  value={txValue}
  onChange={(updatedTxValue) => {
    setTxValue(updatedTxValue);
  }}
  placeholder="value (wei)"
/>
```

## Props

| Prop                       | Type       | Default Value | Description                                                                             |
| -------------------------- | ---------- | ------------- | --------------------------------------------------------------------------------------- |
| **value**                  | `string`   | `undefined`   | The data that your input will show.                                                     |
| **onChange**               | `function` | `undefined`   | A callback invoked when the amount in the input changes.                                |
| **placeholder** (optional) | `string`   | `undefined`   | The string that will be rendered before input data has been entered.                    |
| **name** (optional)        | `string`   | `undefined`   | Helps identify the data being sent if InputBase is submitted into a form.               |
| **error** (optional)       | `boolean`  | `false`       | When set to `true`, changes input border to have error styling.                         |
| **disabled** (optional)    | `boolean`  | `false`       | When set to `true`, changes input background color and border to have disabled styling. |

:::tip[Scaffold-UI]
This component is part of the `@scaffold-ui/debug-contracts` package. For more details, check the [Scaffold-UI docs](https://scaffold-ui-docs.vercel.app/).
:::
