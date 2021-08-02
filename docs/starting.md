---
title: Creating an app
sidebar_position: 2
---

You can install Lithium in two ways, using the NPX command to scaffold a project or directly installing it into your node project.

## Installing via the `npx` command

This method uses the default Lithium starter. It's a bit similar to `create-react-app` if you've every used that.

```bash
npx lithium-cli new YOUR_PROJECT_NAME
```

This is the faster method. You can start creating your CLI within the `src` folder.

After you've installed it, navigate to the project folder and:

```bash
npm i -g .
```

This adds this your CLI to the system path, allowing you to do something like `lithium_starter say hello`.

The command that this adds to your path is the `name` property in your `package.json`. To change it, edit `package.json` and then run another `npm i -g .`. This will sort everything out.

Behind the scenes, this sets up the bin property to run your Node script, it adds the little boilerplate that there is, and sets up the file structure.

## Installing via the NPM package

This method requires using `npm i` directly. Use this for existing JS projects.

```
npm install lithium-cli
# OR
yarn add lithium-cli
```

If you do this, please:

1. Add the NodeJS shebang, `#!/usr/bin/env node` to the file that your CLI starts in

2. Add your file path, for example, `./src/cli.js`, to your `package.json` like this: `"bin": "./src/cli.js"`.

Once you're done, check out [how to use Lithium](using).
