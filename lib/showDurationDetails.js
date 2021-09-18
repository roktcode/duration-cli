import chalk from "chalk";

function endingSeperator(hasSomethingAfter, seperator = `, `) {
	return hasSomethingAfter ? seperator : ``;
}

export default ({ d, h, m, s }) => {
	const days = d > 0 ? `${d} ${chalk.dim(d > 1 ? `Days` : `Day`)}` : ``;
	const hours = h > 0 ? `${h} ${chalk.dim(h > 1 ? `Hours` : `Hour`)}` : ``;
	const minutes =
		m > 0 ? `${m} ${chalk.dim(m > 1 ? `Minutes` : `Minute`)}` : ``;
	const seconds =
		s > 0 ? `${s} ${chalk.dim(s > 1 ? `Seconds` : `Second`)}` : ``;
	const positions = [days !== ``, hours !== ``, minutes !== ``, seconds !== ``];

	const afterDays =
		positions[0] && (positions[1] || positions[2] || positions[3]);
	const afterHours = positions[1] && (positions[2] || positions[3]);
	const afterMinutes = positions[2] && positions[3];

	if (d || h || m || s) {
		console.log(
			` ${chalk.bgMagenta.bold(` DURATION `)}  ${chalk.italic(
				`${days}${endingSeperator(afterDays)}${hours}${endingSeperator(
					afterHours
				)}${minutes}${endingSeperator(afterMinutes)}${seconds}`
			)}`
		);
	}
};
