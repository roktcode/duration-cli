export function formatDuration(duration) {
	let seconds = duration;

	let days = Math.floor(seconds / (3600 * 24));
	seconds -= days * 3600 * 24;
	let hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;
	let minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	return { d: days, h: hours, m: minutes, s: Math.floor(seconds) };
}

export function addZeroFormatting(n) {
	return n < 10 ? `0${n}` : n;
}

export default { formatDuration, addZeroFormatting };
