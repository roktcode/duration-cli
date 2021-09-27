import showTotalDuration from "./showTotalDuration.js";
import showDurationDetails from "./showDurationDetails.js";
import { formatDuration } from "../utils/stringUtils.js";
import showSource from "./showSource.js";

export default (duration, source, calcTime) => {
	const { d, h, m, s } = formatDuration(duration);

	showSource(source);
	console.log();
	// showTotalDuration({ d, h, m, s });
	// console.log();
	showDurationDetails({ d, h, m, s });
	console.log();
	console.log(`Process finished in ${calcTime / 1000} sedonds`)
};
