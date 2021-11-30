import execa from "execa";
import { ffArgs } from "../utils/constants.js";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import pLimit from "p-limit";

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

function calcLimit(filesLength) {
	let limit = pLimit(10);

	if (filesLength <= 100) {
		limit = pLimit(100);
	} else if (filesLength > 100 && filesLength <= 1000) {
		limit = pLimit(50);
	} else if (filesLength > 1000) {
		limit = pLimit(20);
	}

	return limit;
}

export default async function (files) {
	let totalDuration = 0;
	let succeeded = 0;

	const start = new Date();

	// const limit = calcLimit(files.length);
	const limit = pLimit(5);

	let durations;
	
		durations = await Promise.all(
			files.map((file) => limit(() => getFileDuration(file)))
		);

		console.log(durations.length)

		// durations = await Promise.all(
		// 	files.map((file) => getFileDuration(file))
		// );

	for (const duration of durations) {
		if (duration && !isNaN(duration)) {
			totalDuration += duration;
			succeeded++;
		}
	}

	const end = new Date();
	const calcTime = end - start;

	return { succeeded, failedFiles, totalDuration, calcTime };
}
