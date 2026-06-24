---
title: Disable Type & Lint Checks
description: Skip TypeScript and linting checks during development or deployment.
---

# ✅ Disabling Type and Linting Error Checks

:::tip
TypeScript helps you catch errors at compile time, which can save time and improve code quality, but can be challenging for those who are new to the language or who are used to the more dynamic nature of JavaScript. These sections show the steps required to disable type & lint checks on different levels.
:::

## Disabling Commit Checks

We run the `pre-commit` [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) which lints the staged files and doesn't let you commit if there is an linting error.

To disable this, go to the `.husky/pre-commit` file and comment out `yarn lint-staged --verbose`

```diff
- yarn lint-staged --verbose
+ # yarn lint-staged --verbose
```

## Deploying to Vercel Without Any Checks

By default, Vercel runs type and lint checks before building your app. The deployment will fail if there are any type or lint errors.

To ignore these checks while deploying from the CLI, use:

```shell
yarn vercel:yolo
```

If your repo is connected to Vercel, you can set `NEXT_PUBLIC_IGNORE_BUILD_ERROR` to `true` in an [environment variable](https://vercel.com/docs/concepts/projects/environment-variables).

## Disabling GitHub Workflow

We have a GitHub workflow setup checkout `.github/workflows/lint.yaml` which runs type and lint error checks every time code is **pushed** to `main` branch or **pull request** is made to `main` branch.

To disable it, **delete `.github` directory**.
