---
sidebar_position: 1
---

# Getting started

Lithium is the best way to create a CLI in JavaScript. You can do it in literally minutes. Don't spend another second dealing with `process.argv` again. Lithium speeds that process up exponentially with an API that feels like using Express.

Code

```js
const app = require("lithium-cli")()

app.command("say", ({ args: { root } }) => {
	console.log(app.colour.blueBright(root))
})

app.start()
```

Output

```bash
app_name say "Hello world"

# O U T P U T
Hello world
```

## FAQs

1. **How is this different from yargs or similar packages?** Lithium offers a more complete and expressive API than some of those frameworks. However, it's always good to try everything out.

2. **Can I use this in an existing Node project?** Yep! You can just `npm install lithium-cli` and you can use the commands, config, everything when you call the node script.

3. **Can I use this without NPM?** Yes! Just navigate to the [GitHub Repo](https://github.com/ranjithrd/lithium) and copy `lithium.js` and install the peer dependencies from `package.json`. You can import that file and use the whole thing, auto-complete and all!

4. **Where could I use this?** Really, anywhere. I personally like using this with frontend projects rather than npm scripts, but you can use this literally anywhere you are calling Node from the command line.

5. **I'm sold. How do I get started?** Great to hear that! Check out [this link](starting) and you can start within just 5 minutes.
