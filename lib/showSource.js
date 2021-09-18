import chalk from "chalk";

export default function (source) {
	console.log(` ${chalk.bgGreen.bold(` SOURCE `)}    ${chalk.cyan(source)}`);
}
