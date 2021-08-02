---
title: Using Lithium
sidebar_position: 3
---

Lithium is quite simple to use. At its heart, it parses command line arguments and runs the commands that you give it. It also exposes some common packages and functionality that you might want to use.

This is quite a long page, but if you get this done, you'll be up and running with Lithium in no time at all.

### Lithium App

Lithium is primarily based off of one function that returns an instance of a Lithium App. This allows you to create commands, change headers, ask questions, and more.

Import lithium in this way:

```js
const lithium = require("lithium-cli")
```

And to create an app, just call that import. (Lithium exports a function).

```js
const app = lithium()
```

### Adding Commands

To define the commands, you can use the `command` function that Lithium exposes from the app.

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

The `command()` function takes four arguments:

1. The name of the command. For example, `npm install`, where `install` is the name.
2. The action that's to be performed when that command is called. For example, `npm install` would perform the action of installing a package and modifying package.json and all that good stuff.
3. Inputs, `npm install package` would have `package` as a parameter or an input.
4. A description, this is used in the help function.

### Starting Your App

To start your app, run:

```js
app.start()
```

Please run this at the end of your entry file.

### Using Separate Files

Most times you'd want to use multiple files for your commands. Lithium makes this absolutely painless.

Let's take a file, `cli.js`, that contains the main logic, and another file, `commands/read.js`, that contains some commands.

```js title="src/cli.js"
const app = require("lithium-cli")()

app.import(require("./commands/my_file.js"))

app.start()
```

```js title="src/commands/my_file.js"
const app = require("lithium-cli")()

app
	.command
	// ...
	()

module.exports = app.export()
```

The `app.export()` contains logic that exposes commands that you've defined in that app instance.

The `app.import()` contains logic that imports those commands from `export` and saves them into its app instance.

### Configuration

Lithium takes a configuration object that sets things such as the help function, what to display when the command is not found, and what to do before each command. You can find a list of these settings in the reference docs.

Here's how to set this:

```js
const app = require("lithium-cli")()

app.setConfig({
	// Header is run just before the command starts
	header: () => {
		console.log("Header")
	},
	// Footer is run after the command starts
	footer: () => {
		console.log("Footer")
	},
})

// ...

app.start()
```

### Fetching User Input

CLIs are nothing without inputs. To get user input, Lithium uses the fantastic [inquirer](https://npmjs.com/package/inquirer) package.

Lithium exposes a function, `ask()`, on an App instance. Here's how one might use it:

```js
const app = require("lithium-cli")()

const name = await app.ask("What's your name?", "string")
console.log(name)
```

But more times than one, you'd want to ask the user to input data in the command itself. Such as in the example below, where you want the output to be `Hello JS`.

```bash
my-cli greet JS
```

It's really easy to accomplish in Lithium. When using the `command()` function, it takes an argument for all the inputs that you'd want. Here's how you can use it:

```js
const app = require("lithium-cli")()

app.command(
	"greet",
	// This uses Object Destructuring to fetch the root variable
	({ args: { root } }) => {
		console.log(`Hello, ${root}`)
	},
	// This is where you can specify what inputs you want from the user
	[
		{
			question: "Please enter your name",
			type: "string",
			optionArgument: "root",
		},
	]
)
```

The special thing about the snippet above is that if the user provides their name, Lithium doesn't ask them once again, but if they don't, Lithium asks them to enter their name. This means happier users, happier you.

The `root` variable above is quite simple. When you say `npm i package`, package is a parameter that you as a user provide. Same way, Lithium assigns that `package` value to the `root` variable.

If you want something like `npm i --package mypackage`, then instead of root, just look for `package` and Lithium can handle the rest.

### Decorating Output

To make a CLI pop, we'll need colours. And spinners. And lovely boxes. Welp, Lithium uses some amazing packpages that provide this functionality and packages it within an expressive API. Here's how to do all this.

```js
const app = require("lithium-cli")()

// C O L O U R S

console.log(app.colour.red("This is in red!"))
console.log(app.colour.blue("And this in blue!"))

// B O X E S

console.log(app.box("This is in a box!", { padding: 1 }))

// S P I N N E R S

const s = app.spinner("Something's loading...").start()
// do something which takes very very long
s.stop()
```

For more information about colours, boxes, and spinners, checkout [ora](https://npmjs.com/package/ora), [chalk](https://npmjs.com/package/chalk), and [boxen](https://npmjs.com/package/boxen).



Once you're done reading all this, you might want to keep the Lithium reference doc open in a tab so you don't have to open this every few minutes. [It's here, you can click this link](reference).