import chalk from "chalk";

export default function (calcTime) {
	console.log(chalk.dim(` Process finished in ${calcTime / 1000} seconds`));
}
