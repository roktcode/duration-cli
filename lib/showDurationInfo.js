import showDurationDetails from "./showDurationDetails.js";
import { formatDuration } from "../utils/stringUtils.js";
import showSource from "./showSource.js";
import showCalcTime from "./showCalcTime.js";

export default (duration, source, calcTime, showTime) => {
	const { d, h, m, s } = formatDuration(duration);

	showSource(source);
	console.log();
	showDurationDetails({ d, h, m, s });
	console.log();

	if (showTime) showCalcTime(calcTime);
};
