---
title: Create Extensions
description: Build custom extensions for Scaffold-ETH 2.
---

# Creating Your Own Extension

This section will help you develop custom extensions for Scaffold-ETH 2, from simple additions to more complex modifications.

> Video Guide: For a visual walkthrough of the extension development process, check out our [YouTube tutorial](https://youtu.be/XQCv533XGZk?si=dlJH4zd4b99_6soW).

## Extension Structure

Before diving into the development process, let's understand the structure an extension should follow:

```text
your-extension/
├── extension/
│   ├── packages/
│   │   ├── hardhat/        # (optional) For Hardhat-specific additions
│   │   ├── foundry/        # (optional) For Foundry-specific additions
│   │   └── nextjs/
│   │       ├── app/        # Any new pages/files
│   │       │   └── my-page
│   │       │       ├── page.tsx
│   │       │
│   │       ├── ...         # Any extra files/directories
│   │       └── package.json  # Only include additional dependencies/scripts
│   ├── package.json        # Monorepo root package.json file
│   └── README.md           # Instance README
└── README.md               # Documentation for your extension
```

## Developing a Simple Extension

For simple extensions, such as adding a new page or component, you can directly create the extension structure without going through the full development workflow. Here's how:

1. Create the directory structure as shown above.
2. Add your new page or component in the appropriate directory.
3. If needed, create a `package.json` with any additional dependencies.
4. Push your extension to GitHub.

That's it! Your simple extension is ready to be used by others via:

```shell
npx create-eth@latest -e {github-username}/{extension-repo-name}:{branch-name} # branch-name is optional
```

## Developing an Advanced Extension

### Template Files and Args

`create-eth` uses a templating system for advanced extensions that need to modify existing files. This system allows you to inject content into specific files in the base project using the `*.args.mjs` files.

Key points:

- They allow you to add specific content to files in the base project.
- Not all files can be modified this way. See [TEMPLATE-FILES.md](https://github.com/scaffold-eth/create-eth/blob/main/contributors/TEMPLATE-FILES.md) for a list of supported template files.
- To use a template file, create an `*.args.mjs` file in your extension having the same path structure as `*.template.mjs`. For example, to add an extra tab in the header, you'd create `extension/packages/nextjs/components/Header.tsx.args.mjs`.

### Advanced Development Workflow

When creating complex extensions, Scaffold-ETH 2 provides a set of tools to make the process easier. This workflow allows you to develop your extension in a full Scaffold-ETH 2 environment, test it locally, and then package it for distribution.

The workflow consists of two main parts:

1. Extension Development: This process helps you create your extension by modifying a base Scaffold-ETH 2 project.

2. Local Testing: This allows you to test your extension in a full Scaffold-ETH 2 environment before publishing.

### Extension Development Utility

1. **Clone the `create-eth` Repository:**

   ```bash
   git clone https://github.com/scaffold-eth/create-eth.git
   cd create-eth
   yarn install
   ```

2. **Run the Build Script:**

   ```bash
   yarn build:dev
   ```

   This creates `cli.js` and `create-extension.js` in the `dist` directory.

3. **Run the CLI to Create a New Instance:**

   ```bash
   yarn cli
   ```

   This command will create a **new base instance**, similar to running `npx create-eth@latest`.
   Note: It's recommended to create a **new base instance** outside of the `create-eth` folder, so use `../<your-instance-name>`.

   The name mentioned for the "Your project name" question will be used as the **extension name**. For example, if you provide `../eip` as the value to the question, then the final extension name will be `eip`.

4. **Develop the Extension:**
   - cd into the instance directory.
   - Make necessary changes to the instance project.
   - Commit the changes in the instance repository.

5. **Create the Extension:**

   Return to the `create-eth` folder.

   ```bash
   yarn create-extension {projectName}
   ```

   Example: `yarn create-extension ../eip`

   This command gathers all changes from the instance and creates an extension in the `create-eth/externalExtensions/${extensionName}` directory. This directory is the actual extension directory (notice it contains only the extra files related to your extension changes), which can be published to GitHub and used by others.

6. **Publish the Extension:**
   - Go inside the extension directory.
   - Push the extension to GitHub.

   ```bash
   cd create-eth/externalExtensions/${extensionName}
   git init
   git add .
   git commit -m "Initial commit of my extension"
   git remote add origin <remote-repo-url>
   git push -u origin main
   ```

   Now other developers can use your published extension by using:

   ```bash
   npx create-eth@latest -e {github-username}/{extension-repo-name}:{branch-name} # extension-branch-name is optional
   ```

### Local Testing:

This phase allows you to test your extension locally and see how it works when used by other developers.

> NOTE: If you've already published your extension to GitHub using the "Developing a Simple Extension" approach, make sure to clone that extension repository into the `create-eth/externalExtensions/` directory before proceeding with local testing.

1. **Run the CLI in dev mode:**

   ```bash
   yarn cli -e {extensionName} --dev
   ```

   Example: `yarn cli -e eip --dev`

   The `extensionName` should be present in `create-eth/externalExtensions/${extensionName}`.

   Let's suppose you named your project "../my-dev-instance". Then this `../my-dev-instance` should contain all your extension changes. `--dev` will symlink the extension to the instance project.

2. **Test and Tweak the Extension:**
   Since the instance is symlinked with the extension, make necessary changes directly in the symlinked files within `../my-dev-instance`, and the changes should be automatically reflected in the `create-eth/externalExtensions/${extensionName}` directory.

3. **Push the tweaked changes**
   - Go inside the extension directory.
   - Push the changes to GitHub.

   ```bash
   cd create-eth/externalExtensions/${extensionName}
   git add .
   git commit -m "some changes"
   git push
   ```

   Next time users call your extension via `npx create-eth@latest -e`, they will get the updated version.
