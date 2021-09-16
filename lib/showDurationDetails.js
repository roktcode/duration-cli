import chalk from "chalk";

export default ({ h, m, s }) => {
	const hours = h > 0 ? `${h} ${chalk.dim(`Hours`)}` : ``;
	const minutes = m > 0 ? `${m} ${chalk.dim(`Minutes`)}` : ``;
	const seconds = s > 0 ? `${s} ${chalk.dim(`Seconds`)}` : ``;
	const positions = [hours !== ``, minutes !== ``, seconds !== ``];

	if (h || m || s) {
		console.log(
			` ${chalk.bgMagenta.bold(` DETAILS `)}  ${chalk.italic(
				`${hours}${
					positions[0] && (positions[1] || positions[2]) ? `,` : ``
				} ${minutes}${positions[2] ? `,` : ``} ${seconds}`
			)}`
		);
	}
};
