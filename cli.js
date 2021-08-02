#!/usr/bin/env node

const app = require("./lithium")()

app.command(
	"new",
	async ({ args: { root } }) => {
		const path = root ?? "."
		await app
			.execute(
				`git clone https://github.com/ranjithrd/lithium-starter.git ${path}`,
				"",
				false
			)
			.catch((error) => {
				console.error(error)
			})
		console.log(
			app.colour.greenBright(
				`Created a directory.\n\nTo start coding, just open up the ${root} folder in your favourite editor. \n\nHappy coding!`
			)
		)
	},
	[
		{
			question:
				"Please enter the folder where you want to create a new project",
			type: "string",
			optionArgument: "root",
		},
	]
)

app.start()
