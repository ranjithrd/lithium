# Lithium CLI

Lithium is the best way to create a CLI in JavaScript. You can do it in literally minutes. Don't spend another second dealing with `process.argv` again. Lithium speeds that process up exponentially with an API that feels like using Express.

## Installation

You can install Lithium in two ways:

1. Use the Lithium starter:

    ```
    npx lithium-cli new YOUR_PROJECT_NAME
    ```

    This is the faster method. You can start creating your CLI within the `src` folder.

2. Install into your project by:

    ```
    npm install lithium-cli
    # OR
    yarn add lithium-cli
    ```

    If you do this, please:

    - Add the NodeJS shebang, `#!/usr/bin/env node` to the file that your CLI starts in
    - Add your file path, for example, `./src/cli.js`, to your `package.json` like this: `"bin": "./src/cli.js"`.

## Usage

Lithium is primarily based off of one function that returns an instance of a Lithium app. This allows you to create commands, change headers, ask questions, and more.

```js
const lithium = require("lithium-cli")
```

To create an app, call the function.

```js
const app = lithium()
```

To define the commands, you can use the `command` function that Lithium exposes.

```js
// ...

app.command(
	"greet",
	({ args: { root } }) => {
		console.log(`Hello, ${root}`)
	},
	[
		{
			question: "Please enter your name",
			type: "string",
			optionArgument: "root",
		},
	],
	"Says hello [name]"
)

// ...
```

And finally, to start your app, run:

```js
app.start()
```

This is the most basic setup. To use commands from another file,

File 1

```js
const app = require("lithium-cli")()

app
	.command
	// ...
	()

module.exports = app.export()
```

File 2

```js
const app = require("lithium-cli")()

app.import(require("./File2.js"))

app.start()
```

### Configuring Lithium

You may want to set the text which comes up at the start of every command and at the end in one place to avoid repeating code. To do this, you can use the `app.setConfig` method. Here's an example:

```js
const app = require("lithium-cli")()

app.setConfig({
	header: () => {
		console.log("Header")
	},
	footer: () => {
		console.log("Footer")
	}
})

// ...

app.start()
```

You can also use this function to store other global variables if you need it. 

### Packages used

1. Ora (spinners)
2. Chalk (colours)
3. Boxen (boxes)
4. Inquirer (prompts)

Please note that you can simply do a `require("ora")` or `require("chalk")` and use the packages since they are peer dependencies.