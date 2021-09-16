import chalk from "chalk";

export default (failedFiles) => {
	if (failedFiles.length === 0) return;

	console.log(
		`${chalk.dim(` Failed to get duration for these ${failedFiles.length} files: `)}[\n\n${chalk.grey(
			failedFiles
				.map((ff) => `  - ${ff}`)
				.join(`${failedFiles.length > 1 ? `,` : ``}\n`)
		)}\n\n  ]`
	);
};
