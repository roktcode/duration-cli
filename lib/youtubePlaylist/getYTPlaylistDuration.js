import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { promises as fs } from "fs";
import gypd from "gypd";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let auth = "";

async function readAPIKey() {
	let data = null;

	try {
		console.log(path.resolve(__dirname, "key.json"))
		data = await fs.readFile(path.resolve(__dirname,'../../', "key.json"));
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

	auth = apiKey;
}

function extractPlaylistID(playlist) {
	const scheme = `https://www.youtube.com/playlist?list=`;
	const isFullURL = playlist.startsWith(scheme);

	if (!isFullURL) return playlist;

	const fullURLRegex = /playlist\?list=(.*)/;
	const id = playlist.match(fullURLRegex)[1];
	return id;
}

function getFullPlaylistUrl(id) {
	const scheme = `https://www.youtube.com/playlist?list=`;
	return scheme.concat(id);
}

export default async function (playlist) {
	try {
		const id = extractPlaylistID(playlist);
		await readAPIKey();
		const duration = await gypd({ playlistId: id, apiKey: auth });

		return { totalDuration: duration, fullURL: getFullPlaylistUrl(id) };
	} catch (e) {
		throw new Error(e.message);
	}
}
