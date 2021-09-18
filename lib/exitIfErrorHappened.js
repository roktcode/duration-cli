import alert from "cli-alerts";

export default (errorList, spinner) => {
	for (const error of errorList) {
		if (error) {
			spinner.clear();
			// console.clear();

			alert({
				type: "error",
				name: "OOPS!",
				msg: error,
			});

			console.log();

			process.exit(0);
		}
	}

	// if (globError || durationErr) {
	// }
};
