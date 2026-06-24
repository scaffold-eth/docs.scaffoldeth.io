---
title: AddressInput
description: Input field with address validation and ENS support.
---

# AddressInput

Display an Ethereum address input that validates the address format, resolves ENS domains, and shows their avatars.

Also shows a blockie image for each address.

![AddressInput Example](/img/addressInput.gif)

## Import

```tsx
import { AddressInput } from "@scaffold-ui/components";
```

## Usage

```tsx
const [address, setAddress] = useState("");
```

```tsx
<AddressInput
  onChange={setAddress}
  value={address}
  placeholder="Input your address"
/>
```

## Props

| Prop                       | Type       | Default Value | Description                                                                  |
| -------------------------- | ---------- | ------------- | ---------------------------------------------------------------------------- |
| **value**                  | `string`   | `undefined`   | An Ethereum address in (`0x___` format) or an ENS domain.                    |
| **onChange**               | `function` | `undefined`   | A callback invoked when the data in the address input changes.               |
| **placeholder** (optional) | `string`   | `undefined`   | The string that will be rendered before address input has been entered.      |
| **name** (optional)        | `string`   | `undefined`   | Helps identify the data being sent if AddressInput is submitted into a form. |
| **disabled** (optional)    | `boolean`  | `false`       | If `true`, sets the address input un-clickable and unusable.                 |

:::tip[Scaffold-UI]
For more details on customization and theming, check the [Scaffold-UI AddressInput docs](https://scaffold-ui-docs.vercel.app/components/AddressInput).
:::
