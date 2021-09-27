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
	const durations = [];

	// let index = 0;

	// const durations = await Promise.all(files.map(getFileDuration));
	// batch 10 promises

	const start = new Date();

	for (let i = 0; i < files.length; i += 50) {
		const duration = await Promise.all(
			files.slice(i, i + 50).map(getFileDuration)
		);
		durations.push(duration);
	}

	// const durations = await Promise.all(durationPromises);

	// for (let i = 0; i < Math.ceil(files.length / 10); i++) {
	// 	// console.log(files.slice(i * 10, i * 10 + 10))
	// 	const duration = await Promise.all(
	// 		files.slice(i * 10, i * 10 + 10).map(getFileDuration)
	// 	);
	// 	durations.push(duration);
	// }
	// console.log(durations);
	for (const group of durations) {
		// console.log(group);
		for (const duration of group) {
			if (duration && !isNaN(duration)) {
				totalDuration += duration;
				succeeded++;
			}
		}
	}

	const end = new Date();
	const calcTime = end - start;

	// console.log(durations);
	return { succeeded, failedFiles, totalDuration, calcTime };
}

function getCalctime() {}
