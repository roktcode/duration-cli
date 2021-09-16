export default (globError, durationErr) => {
	if (globError || durationErr) {
		spinner.clear();
		console.clear();

		alert({
			type: "error",
			name: "OOPS!",
			msg: globError || durationErr,
		});

		process.exit(0);
	}
};
