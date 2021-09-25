import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function() {
	let data = null;

	try {
		data = await fs.readFile(path.resolve(__dirname, "../../", "key.json"));
	} catch (e) {
		throw new Error(
			"Please first run 'dur init' command, then enter a valid Google API key!"
		);
	}

	const { apiKey } = JSON.parse(data.toString());

	if (!apiKey) {
		throw new Error(
			"Please enter GOOGLE API KEY by running `dur init` command"
		);
	}

	return apiKey;
}
