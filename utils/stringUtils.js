export function formatDuration(duration) {
	// 1 round duration to integer: 416458.971992 -> 416458
	const roundDuration = Math.round(duration);

	// 2 split into hours, minutes and seconds
	const h = Math.trunc(roundDuration / 3600);

	const m =
		h > 0
			? Math.trunc((roundDuration % (h * 3600)) / 60)
			: Math.trunc(roundDuration / 60);

	const s = roundDuration % 60;

	return { h, m, s };
}

export function addZeroFormatting(n) {
	return n < 10 ? `0${n}` : n;
}

export default { formatDuration, addZeroFormatting };
