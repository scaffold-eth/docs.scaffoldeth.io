---
title: RainbowKitCustomConnectButton
description: Enhanced wallet connect button with balance display.
---

# RainbowKitCustomConnectButton

Scaffold-ETH 2 uses a custom _"Connect Button"_, based on RainbowKit, that is enhanced with several useful features:

- **Balance Display**: Shows the balance of the native token from the connected address.
- **Chain Name and Color**: Displays the name of the connected blockchain and uses a distinct color for each chain.
- **Custom Modal**: Includes copy address feature, view its QR code, access address details in blockexplorer, and disconnect.

You can extend this component to suit your app's needs.

![RainbowKitCustomConnectButton Example](/img/RainbowKitCustomConnectButton.gif)

## Import

```tsx
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
```

## Usage

```tsx
<RainbowKitCustomConnectButton />
```
