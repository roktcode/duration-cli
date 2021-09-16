import alert from "cli-alerts";

// exit when files.length is 0
export default function (length, spinner) {
	if (length === 0) {
		spinner.clear();
		console.clear();

		console.log();
		alert({
			type: "error",
			name: "OOPS!",
			// msg: `Couldn't calculate duration for any file`,
			msg: `Couldn't find any media files`,
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
