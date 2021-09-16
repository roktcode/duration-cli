import welcome from "./welcome.js";
import { readFile } from "fs/promises";
import unhandled from "cli-handle-unhandled";

export default async ({ clear = true }) => {
	unhandled();

	const pkgJson = JSON.parse(
		await readFile(new URL("../package.json", import.meta.url))
	);

	welcome({
		title: "duration-cli",
		tagLine: "by Muhammad Yasser",
		// description: ` ${pkgJson.description}`,
		bgColor: "#6cc24a",
		color: "#000000",
		bold: true,
		version: pkgJson.version,
		clear,
	});
};
