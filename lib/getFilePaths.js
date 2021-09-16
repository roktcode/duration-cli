import { promisify } from "util";
import globWithCallBacks from "glob";
const glob = promisify(globWithCallBacks);
import { targetExtensions } from "../utils/constants.js";

export default async function (isOuter) {
	const extensions = targetExtensions.map((ex) => `.${ex}`).join("|");
	const pattern = isOuter ? `*@(${extensions})` : `**/*@(${extensions})`;

	const files = await glob(pattern, { cwd: process.cwd() });
	return files;
}
