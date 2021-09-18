import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function persistAPIKey(apiKey) {
	try {
		const data = {
			apiKey,
		};

		await fs.writeFile(
			path.resolve(__dirname, "../../", "key.json"),
			JSON.stringify(data)
		);

		console.log("GOOGLE API KEY has been saved!");
		console.log();
	} catch (e) {
		console.error(e);
	}
}
