---
title: Reference
sidebar_position: 4
---

This is the reference document for Lithium. It outlines everything that Lithium has to offer.

While Lithium provides auto-complete in VS-Code through JS-Doc, this is just easier to find sections and functions.

### Importing Lithium

```js
const lithium = require("lithium-cli")
const app = lithium()
```

| Parameter       | Description                                                                               |
| --------------- | ----------------------------------------------------------------------------------------- |
| setConfig       | A function that allows you to set the configuration object.                               |
| command         | A function that allows you to add a command to your CLI                                   |
| export          | A function that exports your commands. Use with import                                    |
| import          | A function that can import commands. Use with export                                      |
| ask             | A function that exposes an API to ask the user a question                                 |
| start           | A function that allows you to start your CLI                                              |
| execute         | A function that allows you to run a bash command                                          |
| spinner         | A function that expores [ora](https://npmjs.com/package/ora)                              |
| colour          | A function that exposes [chalk](https://npmjs.com/package/chalk)                          |
| box             | A function that exposes [boxen](https://npmjs.com/package/boxen)                          |
| logWithColour   | A function that allows you to log a value with colour. Use with execute                   |
| errorWithColour | A function that allows you to log a value with console.error and colour. Use with execute |

### setConfig

Allows you to modify the configuration object. Here's how the configuration object is shaped:

| Parameter         | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| header            | A synchronous function called **before** every command is executed |
| footer            | A synchronous function called **after** every command is executed  |
| onHelp            | A function called when `your_cli help` is run                      |
| onCommandNotFound | A function called when a command that is not found is run          |

Please note that passing in any of these parameters **only** overrides the parameter that you have passed.

**You can also use this to store some metadata about your application.**

### command

The command function allows you to enter a command. It takes these parameters: (**note that these parameters are positional**)

| Parameter   | Description                                                                   |
| ----------- | ----------------------------------------------------------------------------- |
| name        | The name of the command, for example, `npm i` would be `i`                    |
| action      | The function to be run when the name is matched. Refer to the below table     |
| inputs      | A list of inputs (see `LithiumInput`) that you can use to get user parameters |
| description | A simple string describing your command. This is used in the help function    |

The action that you have to provide will have to take these parameters: (the callback you provide can be asynchronous)

| Parameter               | Description                                                                       |
| ----------------------- | --------------------------------------------------------------------------------- |
| args                    | Contains the values that the user has provided your command. Refer the below note |
| os                      | The operating system. Possible values: `macos`, `windows`, `linux`, `unknown`     |
| currentWorkingDirectory | Current directory right from the command line                                     |

**Note about args** This object gets you an object. This depends heavily on the input that the user has provided. There are a couple shapes it could be in: boolean, string, or root. Boolean is quite simple. If the user says something like `cli deploy --cloud`, the args would have a property called `cloud` which is `true`. If the user says `cli deploy --cloud aws`, you'd have a property `cloud` saying `aws`. If the user says `cli deploy .`, you'd get `root` as `.`

### export and import

These are quite simple. They are designed to be used with each other.

```js
// In subfolder file
module.exports = app.export()

// In parent file
app.import(require("your_subfolder_file.js"))
```

### ask, LithiumInput

| Parameter | Description                                                                                            |
| --------- | ------------------------------------------------------------------------------------------------------ |
| question  | A string, this has to be asked to the user                                                             |
| type      | `string`, `boolean`, `number`, `password`, `choices`                                                   |
| options   | Specify this in the format of `LithiumInputChoice` (see below) **only if you chose `choices` in type** |

**LithiumInputChoice**

| Parameter | Description                       |
| --------- | --------------------------------- |
| name      | The display name of this option   |
| value     | The program value for this option |

### start

There's no parameters or return value. Just make sure that this is run only once and in the entry point file.

### execute

This is an **asynchronous** function to execute shell command. Note that **parameters are positional**

| Parameter     | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| command       | The command that needs to be run                                           |
| directory     | The directory in which the command has to be executed                      |
| showOutput    | If the output for that command needs to be displayed                       |
| logFunction   | A function that takes a value and prints it if the command is successful.  |
| errorFunction | A function that takes a value and prints it if the command is unsuccessful |

Returns a `String` or throws an `Error`.

For `logFunction` and `errorFunction`, please refer to **logWithColour** and **errorWithColour**.

### colour, box, spinner

Please refer to the respective packages for more information. This just directly exports all their functionality without any modifications, so their documentation and community resources **will be applicable**.

| Function | Package Link                             |
| -------- | ---------------------------------------- |
| colour   | [chalk](https://npmjs.com/package/chalk) |
| box      | [boxen](https://npmjs.com/package/boxen) |
| spinner  | [ora](https://npmjs.com/package/ora)     |

### logWithColour, errorWithColour

This is designed to be used with **execute**, specifically for arguments `logFunction` and `errorFunction`. It takes an argument of a function to run which adds colour, usually `app.colour.red` or `app.colour.blue` or something to that extent. Here's a snippet displaying how you can use this.

```js
app.execute(
	"ls .",
	".",
	true,
	app.logWithColour(app.colour.blue),
	app.errorWithColour(app.colour.red)
)
```
