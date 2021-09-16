#!/usr/bin/env node

/**
 * duration-cli
 * A CLI to get total duration of media files
 *
 * @author Muhammad Yasser <https://iamrokt.github.io>
 *
 */

import init from "./utils/init.js";
import cli from "./utils/cli.js";
import chalk from "chalk";
import ora from "ora";
import { to } from "await-to-js";
import getFilePaths from "./lib/getFilePaths.js";
import getDuration, { failedFiles } from "./lib/getDuration.js";
import showLog from "./lib/showLog.js";
import exitIfNoFilesFound from "./lib/exitIfNoFilesFound.js";
import exitIfErrorHappened from "./lib/exitIfErrorHappened.js";
import showOnlySeconds from "./lib/showOnlySeconds.js";
import showDurationInfo from "./lib/showDurationInfo.js";
import showDurationErrors from "./lib/showDurationErrors.js";

const spinner = ora({ text: `` });

function showSpinner() {
	spinner.start(`${chalk.yellow(`CALCULATING`)} duration...`);
}

function hideSpinner() {
	spinner.stop(`${chalk.yellow(`CALCULATING`)} finished!`);
}

const { input, flags } = cli;
const { clear, log, minimal, parent, help } = flags;

(async function () {
	!minimal && (await init({ clear }));
	(input.includes(`help`) || help) && cli.showHelp(0);

	!minimal && showSpinner();

	const [globError, files] = await to(getFilePaths(parent));

	exitIfNoFilesFound(files.length, spinner);

	const [durationError, durationData] = await to(getDuration(files));

	exitIfErrorHappened(globError, durationError);

	minimal && showOnlySeconds(durationData.totalDuration);

	hideSpinner();

	!log && showDurationErrors(failedFiles.length);

	console.log();

	showDurationInfo(durationData.totalDuration);

	console.log();

	log && showLog(durationData, files, failedFiles, parent);

	console.log();
})();
