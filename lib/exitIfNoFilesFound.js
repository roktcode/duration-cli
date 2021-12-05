import alert from "cli-alerts";
import chalk from 'chalk'


// exit when files.length is 0
export default function (length, spinner, source, parent) {
	if (length === 0) {
		spinner.clear();
		console.clear();
		console.log();

		console.log(chalk.dim(`  Source: ${process.cwd()} ${parent ? `` : `(and sub-folders)`}`));
		// showSource(source, parent);
		console.log();
		alert({
			type: "error",
			name: "OOPS!",
			// msg: `Couldn't calculate duration for any file`,
			msg: `Couldn't find any supported media files`,
		});
		console.log();

		// alert({
		// 	type: "info",
		// 	name: "SUPPORTED FORMATES:",
		// 	// msg: `Couldn't calculate duration for any file`,
		// 	msg: `[${targetExtensions.join(" ")}]`,
		// });
		// log();

		process.exit(0);
	}
}
