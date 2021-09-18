import execa from "execa";
import { ffArgs } from "../utils/constants.js";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";

const ffpropeBinary = ffprobeInstaller.path;

const failedFiles = [];

async function getFileDuration(file) {
	try {
		const { stdout: duration } = await execa(ffpropeBinary, [...ffArgs, file]);
		!parseFloat(duration) && failedFiles.push(file);

		return parseFloat(duration);
	} catch (e) {
		failedFiles.push(file);
		return null;
	}
}

export default async function (files) {
	let totalDuration = 0;
	let succeeded = 0;

	const durations = await Promise.all(files.map(getFileDuration));

	for (const duration of durations) {
		if (duration && !isNaN(duration)) {
			totalDuration += duration;
			succeeded++;
		}
	}

	return { succeeded, failedFiles, totalDuration };
}
