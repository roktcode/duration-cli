import gypd from "gypd";
import getApiKey from "./getApiKey.js";

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
		const apiKey = await getApiKey();
		const duration = await gypd({ playlistId: id, apiKey });

		return { totalDuration: duration, fullURL: getFullPlaylistUrl(id) };
	} catch (e) {
		throw new Error(e.message);
	}
}
