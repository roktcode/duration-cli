import meow from "meow";
import meowHelp from "cli-meow-help";

const flags = {
	clear: {
		type: "boolean",
		default: true,
		alias: `c`,
		desc: `Clear the console`,
	},
	log: {
		type: "boolean",
		default: false,
		alias: `l`,
		desc: `Print log info`,
	},
	version: {
		type: "boolean",
		alias: "v",
		desc: `Print CLI version`,
	},
	minimal: {
		type: "boolean",
		alias: "m",
		default: false,
		desc: "Print total duration in seconds",
	},
	parent: {
		type: "boolean",
		alias: "p",
		default: false,
		desc: "Only calculate duration for parent directory",
	},
	help: {
		type: "boolean",
		alias: "h",
		desc: "Print help info",
		default: false,
	},
	playlist: {
		type: "string",
		alias: "pl",
		desc: "Print total duration of a YouTube playlist",
	},
	time: {
		type: "boolean",
		alias: 't',
		desc: "Print calculation process time"
	}
};

const commands = {
	help: {
		desc: `Print help info`,
	},
	init: {
		desc: "Init the CLI with a Google API key",
	},
};

const helpText = meowHelp({
	name: `dur`,
	flags,
	commands,
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags,
	importMeta: import.meta,
};

export default meow(helpText, options);
