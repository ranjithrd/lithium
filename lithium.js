// D E F I N I T I O N S

/**
 * @typedef {object} LithiumCommand
 * @property {string} command
 * @property {string} description
 * @property {Function} action
 * @property {LithiumInput[]} inputs
 */

/**
 * @typedef {Object} LithiumInput
 * @property {string} question
 * @property {string} optionArgument
 * @property {"string" | "number" | "boolean" | "choices" | "password"} type
 * @property {LithiumInputChoice[]=} choices
 */

/**
 * @typedef {Object} LithiumInputChoice
 * @property {string} name
 * @property {string} value
 */

/**
 * @typedef LithiumCommandCallbackObject
 * @type {object}
 * @property {Object} args Arguments given in the command line
 * @property {"mac" | "linux" | "windows" | "unknown"} os Operating system where the command is being run
 * @property {string} currentWorkingDirectory Path to directory where command is being run
 */

/**
 * @callback LithiumCommandCallback
 * @param {LithiumCommandCallbackObject} options The options that your command can use
 * @returns {void}
 */

/**
 * @callback LithiumHeaderFunction
 * @param {string} command
 * @returns {void}
 */

/**
 * @callback LithiumFooterFunction
 * @param {string} command
 * @returns {void}
 */

/**
 * @callback LithiumHelpFunction
 * @param {LithiumCommand[]} commands
 * @returns {void}
 */

/**
 * @callback LithiumNotFoundFunction
 * @returns {void}
 */

/**
 * @typedef {object} LithiumConfig
 * @property {Function=} header Called right before command mounts
 * @property {Function=} footer Called after command has finished
 * @property {Function=} onHelp Used at `something --help` to display commands
 * @property {Function=} onCommandNotFound Called when no command is found
 */

/**
 * @callback LithiumExecute
 * @param {string} command The command that needs to be run
 * @param {string} directory The directory in which the command has to be executed
 * @param {boolean=} showOutput If the output for that command needs to be displayed
 * @param {Function=} logFunction A function that takes a value and prints it if the command is successful
 * @param {Function=} errorFunction A function that takes a value and prints it if the command is unsuccessful
 * @returns {string | Error}
 */

// I M P O R T S

const chalk = require("chalk")
const boxen = require("boxen")
const ora = require("ora")
const inquirer = require("inquirer")

/**
 * Creates a Lithium application.
 */
module.exports = () => {

	// This contains some default options.
	/**
	 * @type {LithiumConfig}
	 */
	let config = {
		onCommandNotFound: function () {
			console.error("Sorry, we couldn't find that command. Try again?")
		},
		onHelp: function (commands) {
			let helpString = ``
			for (let command of commands) {
				helpString += `${command.command}: ${command.description ?? ""
					}\n`
			}

			console.log(helpString)
		},
		header: function () { },
		footer: function () { },
	}

	/**
	 * @type {LithiumCommand[]}
	 */
	let commands = [
		{
			command: "help",
			action: () => config.onHelp(commands),
			description: "Shows a list of all commands",
		},
	]

	return {
		/**
		 * Sets the Lithium App configuration.
		 * @param {LithiumConfig} newConfig
		 * @returns {void}
		 */
		setConfig: function (newConfig) {
			// Updates rather than replaces the object
			config = {
				...config,
				...newConfig,
			}
		},

		/**
		 * Creates a command for your Lithium App.
		 * @param {string} command
		 * @param {LithiumCommandCallback} action
		 * @param {LithiumInput[]} inputs
		 * @param {string} description
		 */
		command: function (command, action, inputs, description) {
			// Adds the command to the commands object
			commands.push({ command, action, description, inputs })
		},

		/**
		 * Export commands from your app. Use with `app.import()`
		 * @returns {LithiumCommand[]}
		 */
		export: function () {
			// Exports app commands
			return commands
		},

		/**
		 * Use commands from other files in your app. Use with `app.export()`
		 * @param {LithiumCommand[]} fileCommands The commands to load
		 */
		import: function (fileCommands) {
			// Adds the given commands to app's internal command list
			commands.push(...fileCommands.filter(({ command }) => command !== "help"))
		},

		/**
		 * Allows you to ask the user a question
		 * @param {string} question The question that will be displayed to the user
		 * @param {"string" | "number" | "boolean" | "choices" | "password"} type The type of user input
		 * @param {LithiumInputChoice[]=} options
		 * @returns
		 */
		ask: function (question, type, options) {
			// Converts Lithium choice type into an Inquirer type
			let inqType = ""
			switch (type) {
				case "string":
					inqType = "input"
					break
				case "number":
					inqType = "number"
					break
				case "boolean":
					inqType = "list"
					options = [
						{ name: "Yes", value: true },
						{ name: "No", value: false },
					]
					break
				case "choices":
					inqType = "list"
					break
				case "password":
					inqType = "password"
				default:
					return
			}

			return new Promise((resolve, reject) => {
				// Passes on command to inquirer
				inquirer
					.prompt([
						{
							type: inqType,
							// q1 is set by default since there is always only one question in this function
							name: "q1",
							choices: options,
							message: question,
						},
					])
					.then(({ q1 }) => {
						resolve(q1)
					})
					.catch((error) => {
						reject(error)
					})
			})
		},

		/**
		 * Starts your Lithium app
		 * @returns {void}
		 */
		start: async function () {
			// Gets the directory in which the command has been called in
			const cwd = await execute("pwd", ".", false)

			// Gets and destructures the arguments provided to the app
			const preArguments = process.argv
			const [nodeEnv, binEnv, ...args] = preArguments

			// Figures out which command has to be run and assigns the relevant Node arguments
			let commandMatched = null
			let commandArguments = []
			for (let command of commands) {
				let i = 0
				while (i < args.length) {
					const commandToBeMatched = args.slice(0, i + 1)
					if (commandToBeMatched.join(" ") === command.command) {
						commandMatched = command
						commandArguments = args
							.slice(i + 1)
							.map((arg, index) => ({ arg, index }))
					}
					i++
				}
			}

			// Converts the Node arguments into a more human friendly version
			let finalArguments = {}
			for (let a of commandArguments) {
				if ((a?.arg ?? "").startsWith("--")) {
					const i = commandArguments.findIndex(
						(p) => p.index == a.index + 1
					)
					const formattedOption = a.arg.slice(2)
					const nextArg = commandArguments[i]
					if (nextArg) {
						if (nextArg.arg.startsWith("--")) {
							finalArguments[formattedOption] = true
						} else {
							finalArguments[formattedOption] = nextArg.arg
							commandArguments[i] = {}
						}
					} else {
						finalArguments[formattedOption] = true
					}
				} else {
					if (a != {} && a.arg) {
						finalArguments.root = a.arg
					}
				}
			}

			// Gets the Operating System of the user to pass on to the command action
			let platform = ""
			switch (process.platform) {
				case "darwin":
					platform = "mac"
					break

				case "aix":
				case "freebsd":
				case "linux":
				case "openbsd":
				case "sunos":
					platform = "linux"
					break

				case "win32":
					platform = "windows"
					break

				default:
					platform = "unknown"
					break
			}

			// If there's a command which has been matched, then execute that
			if (commandMatched) {
				// Executes the header
				await config.header(commandMatched.command)
				// Ensures that the arguments are all provided, and if not, asks the user
				for (let input of (commandMatched.inputs ?? [])) {
					if (!finalArguments[input.optionArgument]) {
						const res = await this.ask(
							input.question,
							input.type,
							input.choices
						)
						finalArguments[input.optionArgument] = res
					}
				}
				// Executes the user
				await commandMatched.action({
					args: finalArguments,
					currentWorkingDirectory: cwd,
					os: platform,
				})
				// Executes the footer
				await config.footer(commandMatched.command)
			} else {
				// Otherwise executes commandNotFound from config
				await config.onCommandNotFound()
			}
		},

		/**
		 * Allows calling shell commands asynchronously
		 * @type {LithiumExecute}
		 */
		execute: execute,

		/**
		 * Allows you to create and use spinners in your app
		 */
		spinner: ora,

		/**
		 * Allows you to use colour in your app
		 */
		colour: chalk,

		/**
		 * Allows you to use boxes when printing something in your app
		 */
		box: boxen,

		/**
		 * Allows you to log a value with a colour
		 * @param {Function} colour
		 * @returns {Function}
		 */

		logWithColour: (colour) => (value) => console.log(colour(value)),
		/**
		 * Allows you to log an error with a colour
		 * @param {Function} colour
		 * @returns {Function}
		 */
		errorWithColour: (colour) => (value) => console.error(colour(value)),
	}
}

/**
 * Allows calling shell commands asynchronously
 * @type {LithiumExecute}
 */
function execute(command, directory, showOutput, logFunction, errorFunction) {
	const { spawn } = require("child_process")

	const log = logFunction ? logFunction : console.log
	const logError = errorFunction ? errorFunction : console.error

	return new Promise((resolve, reject) => {
		let data = ``

		const cmd = spawn(command, {
			cwd: directory,
			shell: true,
		})

		cmd.stdout.on("data", (chunk) => {
			if (showOutput ?? true) log(chunk.toString())
			data = `${data}\n${chunk}`
		})

		cmd.stderr.on("data", (chunk) => {
			if (showOutput ?? true) logError(chunk.toString())
		})

		cmd.on("error", (error) => {
			if (showOutput ?? true) logError(`error: ${JSON.stringify(error)}`)
		})

		cmd.on("close", (code) => {
			if (code !== 0 && (showOutput ?? true))
				log(`child process exited with code ${code}`)
			code === 0 ? resolve(data) : reject(data)
		})
	})
}
