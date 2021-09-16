import chalk from "chalk";
import { addZeroFormatting } from "../utils/stringUtils.js";

export default ({h, m, s}) => {
	console.log(
		` ${chalk.bgGreen.bold(` TOTAL `)}    (${chalk.cyan(
			addZeroFormatting(h)
		)}:${chalk.cyan(addZeroFormatting(m))}:${chalk.cyan(addZeroFormatting(s))})`
	);
};
