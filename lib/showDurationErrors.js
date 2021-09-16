import chalk from "chalk";

export default (failedFilesCount) => {
	if (failedFilesCount === 0) return;

	console.log(
		` ${chalk.bgRed(` ERRORS `)}    ${chalk.dim(
			`${failedFilesCount} (run \`dur -l\` to view log info)`
		)}`
	);
};
