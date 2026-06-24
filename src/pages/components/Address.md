---
title: Address
description: Display Ethereum addresses with ENS resolution and copy feature.
---

# Address

Display an address (or ENS) along with a utility icon to copy the address. If the address is associated with an ENS that has an avatar, this avatar will be displayed. If not, a blockie image representation of the address will be shown.

By default, the component will show the ENS name (if available) and the address.

![Ens And Address Example](/img/AddressFull.png)

You can also choose to display only the ENS name (if available) or the address, by setting the `onlyEnsOrAddress` prop to `true`.

![Only Ens Or Address Example](/img/AddressOnlyEnsOrAddress.png)

Clicking on the address redirects to the connected wallet's network block explorer. If the wallet is not connected, it redirects to the block explorer of [`targetNetworks[0]`](/deploying/deploy-nextjs-app#--targetnetworks). You can disable this behaviour with the `disableAddressLink` prop.

## Import

```tsx
import { Address } from "@scaffold-ui/components";
```

## Usage

```tsx
<Address address="0x34aA3F359A9D614239015126635CE7732c18fDF3" />
```

## Props

| Prop                              | Type      | Default Value | Description                                                                                                                   |
| --------------------------------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **address**                       | `string`  | `undefined`   | Address in `0x___` format, it will resolve its ENS if it has one associated.                                                  |
| **disableAddressLink** (optional) | `boolean` | `false`       | Set it to `true` to disable the blockexplorer link behaviour when clicking on the address.                                    |
| **format** (optional)             | `string`  | `"short"`     | By default, only the first five characters of the address are displayed. Set this to `"long"` to display the entire address.  |
| **size** (optional)               | `string`  | `"base"`      | Size for the displayed Address component. `base` by default but you can pass in `xs`, `sm`, `base`, `lg`, `xl`, `2xl`, `3xl`. |
| **onlyEnsOrAddress** (optional)   | `boolean` | `false`       | When `true`, displays only the ENS name (if available) or the address, not both.                                              |

:::tip[Scaffold-UI]
For more details on customization and theming, check the [Scaffold-UI Address docs](https://scaffold-ui-docs.vercel.app/components/Address).
:::
