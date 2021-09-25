import chalk from "chalk";
import showFailedFiles from "./showFailedFiles.js";

export default function (durationData, files, failedFiles, parent) {

	console.log();

	console.log(
		`${chalk.dim(` MEDIA FILES: `)}${chalk.cyan(files.length)} ${chalk.dim(
			`files`
		)}`
	);

	console.log(
		`${chalk.dim(` CALCULATED: `)}${chalk.green(durationData.succeeded)} `
	);

	failedFiles.length > 0
		? console.log(`${chalk.dim(` ERRORS: `)}${chalk.red(failedFiles.length)} `)
		: console.log(`${chalk.dim(` ERRORS: ${chalk.green(`NONE`)}`)}`);

	console.log();

	showFailedFiles(failedFiles);
}
