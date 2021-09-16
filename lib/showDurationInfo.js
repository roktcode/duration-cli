import showTotalDuration from "./showTotalDuration.js";
import showDurationDetails from "./showDurationDetails.js";
import { formatDuration } from "../utils/stringUtils.js";

export default (duration) => {
	const { h, m, s } = formatDuration(duration);
	
	showTotalDuration({ h, m, s });
	console.log();
	showDurationDetails({ h, m, s });
};
