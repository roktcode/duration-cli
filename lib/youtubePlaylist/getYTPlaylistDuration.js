// import dotenv from "dotenv";
import { google } from "googleapis";

import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { promises as fs } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


let auth = "";
const youtube = google.youtube("v3");

let totalDuration = 0;

async function fetchVideoIDsForPageToken(playlistId, pageToken, auth) {
	const response = await youtube.playlistItems.list({
		playlistId,
		part: "contentDetails",
		pageToken,
		auth,
		maxResults: 50,
	});

	const pageIDs = response.data.items.map(
		(item) => item.contentDetails.videoId
	);

	const nextPageToken = response.data.nextPageToken;

	return {
		pageIDs,
		nextPageToken,
	};
}

async function readAPIKey() {
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

	auth = apiKey;
}

const getVideosPromiseList = [];

async function getPlaylistDuration(playlistId, pageToken = null) {
	const { pageIDs, nextPageToken } = await fetchVideoIDsForPageToken(
		playlistId,
		pageToken,
		auth
	);

	getVideosPromiseList.push(getVideos(pageIDs));

	if (nextPageToken) {
		await getPlaylistDuration(playlistId, nextPageToken);
	}
}

async function getVideos(videoIDs) {
	const response = await youtube.videos.list({
		auth,
		id: videoIDs,
		part: "contentDetails",
		maxResults: 50,
	});

	return response.data.items;
}

async function calculatePageDuration() {
	const videoGroups = await Promise.all(getVideosPromiseList);

	for (const group of videoGroups) {
		for (const video of group) {
			totalDuration += toSeconds(video.contentDetails.duration);
		}
	}
}

function toSeconds(input) {
	try {
		const regex = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
		let days = 0;
		let hours = 0;
		let minutes = 0;
		let seconds = 0;
		let totalSeconds;

		if (regex.test(input)) {
			let matches = regex.exec(input);

			if (matches[1]) days = Number(matches[1]);
			if (matches[2]) hours = Number(matches[2]);
			if (matches[3]) minutes = Number(matches[3]);
			if (matches[4]) seconds = Number(matches[4]);

			totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
		} else {
			throw new Error(`Invalid date: ${input}`);
		}

		return totalSeconds;
	} catch (e) {
		console.error(e);
		if (e.message.includes("Invalid date")) {
			return "Invalid date";
		}
	}
}

export default async function run(playlist) {
	// const full = `https://www.youtube.com/playlist?list=PLHIfW1KZRIfn8syRyesWdACFYyupONa3R`;
	// const short = "PLHIfW1KZRIfn8syRyesWdACFYyupONa3R";

	let id = playlist;

	const scheme = `https://www.youtube.com/playlist?list=`;
	const isFullURL = playlist.startsWith(scheme);

	if (isFullURL) {
		const fullURLRegex = /playlist\?list=(.*)/;
		id = playlist.match(fullURLRegex)[1];
	}

	await readAPIKey();
	await getPlaylistDuration(id);
	await calculatePageDuration();
	return { totalDuration, fullURL: scheme.concat(id) };
}
