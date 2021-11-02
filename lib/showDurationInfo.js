import showDurationDetails from "./showDurationDetails.js";
import { formatDuration } from "../utils/stringUtils.js";
import showSource from "./showSource.js";
import showCalcTime from "./showCalcTime.js";

<<<<<<< HEAD
export default (duration, source, calcTime) => {
=======
export default (duration, source, calcTime, showTime) => {
>>>>>>> next
	const { d, h, m, s } = formatDuration(duration);

	showSource(source);
	console.log();
	showDurationDetails({ d, h, m, s });
	console.log();
<<<<<<< HEAD
	console.log(`Process finished in ${calcTime / 1000} sedonds`)
=======

	if (showTime) showCalcTime(calcTime);
>>>>>>> next
};
