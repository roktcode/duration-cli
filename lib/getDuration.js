import execa from "execa";
import { ffArgs } from "../utils/constants.js";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

const ffpropeBinary = ffprobeInstaller.path;

export const failedFiles = [];

async function getFileDuration(file) {
	try {
		const { stdout: duration } = await execa(ffpropeBinary, [...ffArgs, file]);
		// failed && !parseFloat(duration) && failedFiles.push(file);
		!parseFloat(duration) && failedFiles.push(file);
		return parseFloat(duration);
	} catch (e) {
		return null;
	}
}

export default async function (files) {
	let totalDuration = 0;
	let succeeded = 0;
	let failed = 0;

	const durations = await Promise.all(files.map(getFileDuration));

	for (const duration of durations) {
		if (duration && !isNaN(duration)) {
			totalDuration += duration;
			succeeded++;
		} else {
			failed++;
		}
	}

	return { succeeded, failed, totalDuration };
}
