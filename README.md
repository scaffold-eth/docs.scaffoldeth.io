# Scaffold-ETH 2 Docs

This website contains Scaffold-ETH 2 Documentation and is built using [Vocs](https://vocs.dev/).

## Requirements

To run the Documentation site locally, first ensure you have [Node](https://nodejs.org/en/download/), [pnpm](https://pnpm.io/installation), and [Git](https://git-scm.com/downloads) installed.

## Installation

Clone the repository, install all dependencies, and then start Vocs.

```bash
git clone https://github.com/scaffold-eth/docs.scaffoldeth.io.git
cd docs.scaffoldeth.io
pnpm install
pnpm dev
```

### Build and Preview

To build the documentation for production:

```bash
pnpm build
pnpm preview
```

## Contribution Guidelines

Thank you for your interest in contributing to improve the documentation!

There are two types of contributions you can make:

- Fix errors or add new pages to the current documentation content.
- Fix bugs or introduce new features to the documentation website (within the Vocs codebase).

## Content contributions

The documentation content is written in Markdown/MDX format and is located in the `docs/pages` folder. If you're not familiar with Markdown, please check this [guide](https://guides.github.com/features/mastering-markdown/) or this [cheat sheet](https://www.markdownguide.org/cheat-sheet/) to get started.

MDX files combine Markdown with React components. You can learn more about MDX in the [Vocs docs](https://vocs.dev/docs/guides/markdown).

### Existing content

If you find anything that is confusing or can be improved in an existing document, you can click **"Edit on GitHub"** at the top of the page, which will redirect to the GitHub edit form of that document. Make your changes and submit a pull request (PR).

### New content

When **adding a new page**, you need to fork the repository, create a new branch, and make all changes necessary in your repository. Once you are done with your changes, create a PR to Scaffold-ETH 2 Documentation repository.

Add the new pages to the `docs/pages` folder, placing them in the specific directory where you want the page to be shown.

**Sidebar** links are configured in `vocs.config.ts`. When adding new pages, you'll need to manually add them to the sidebar configuration.

## Website contributions

For contributions to the Website Code, we follow the ["fork-and-pull" Git workflow](https://github.com/susam/gitpr).

Fork the repository, create a new branch, and make all changes necessary in your repository. Once you are done with your changes, create a PR to Scaffold-ETH 2 Documentation repository.

### Configuration

- `vocs.config.ts` - This file contains the Vocs configuration. Here you can manage site metadata, sidebar navigation, social links, and top navigation. You can visit [Vocs docs](https://vocs.dev/docs/api/config) to learn more about the configuration options.

### Sidebar

The sidebar is configured in `vocs.config.ts` under the `sidebar` property. Each sidebar item can be a link or a collapsible section with nested items.

Example:

```typescript
sidebar: [
  {
    text: "🚀 Quick Start",
    items: [
      { text: "Installation", link: "/quick-start/installation" },
      { text: "Environment", link: "/quick-start/environment" },
    ],
  },
];
```

For more details, visit the [Vocs Sidebar documentation](https://vocs.dev/docs/api/config#sidebar).

### Components

Custom React components are located in `docs/components/`. You can import and use these components in any MDX file.

### Static Assets

Static assets (images, etc.) are placed in `docs/public/` and can be referenced in your content using absolute paths like `/img/example.png`.

---

If there's something overlooked in this `README.md` or if any instructions are unclear, remember you can also contribute to improve it. **Fork, modify and PR to our repository!**

All contributions are welcome!
