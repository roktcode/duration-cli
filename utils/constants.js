export const targetExtensions = [
	"mp4",
	"mkv",
	"webm",
	"avi",
	"mov",
	"mp3",
	"wav",
	"m4a",
	"flac",
	"wma",
];

export const ffArgs = [
	"-show_entries",
	"format=duration",
	"-v",
	"quiet",
	"-of",
	`csv=p=0`,
];
