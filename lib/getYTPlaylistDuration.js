import dotenv from "dotenv";
import { google } from "googleapis";

dotenv.config();

const log = console.log;

const GOOGLE_API_KEY = "";
const youtube = google.youtube("v3");

// const playlistId = `PLHIfW1KZRIfm9AggWn48SzdOqHavPD3w4`;
// const playlistId = `PLuXY3ddo_8nzUrgCyaX_WEIJljx_We-c1`;

const ids = [];
let totalDuration = 0;

function formatDuration(duration) {
	let seconds = duration;
	let days = Math.floor(seconds / (3600 * 24));
	seconds -= days * 3600 * 24;
	let hours = Math.floor(seconds / 3600);
	seconds -= hours * 3600;
	let minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60;

	return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

async function fetchVideoIDsForPageToken(playlistId, pageToken, auth) {
	const response = await youtube.playlistItems.list({
		// playlistId: `PLuXY3ddo_8nzrO74UeZQVZOb5-wIS6krJ`,
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

const auth = process.env.GOOGLE_API_KEY || GOOGLE_API_KEY;

async function getPlaylistDuration(playlistId, pageToken = null) {
	const { pageIDs, nextPageToken } = await fetchVideoIDsForPageToken(
		playlistId,
		pageToken,
		auth
	);

	ids.push(...pageIDs);
	const videos = await getVideos(pageIDs);
	calculatePageDuration(videos);

	if (nextPageToken) {
		await getPlaylistDuration(playlistId, nextPageToken);
	}
}

async function getVideos(videoIDs) {
	// log(videoIDs.join(","));
	const response = await youtube.videos.list({
		auth: auth,
		id: videoIDs,
		part: "contentDetails",
		maxResults: 50,
	});

	// log(response.data);

	return response.data.items;
}

function calculatePageDuration(videos) {
	for (const video of videos) {
		totalDuration += toSeconds(video.contentDetails.duration);
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

export default async function (playlistId) {
	// const playlistId = `PLuXY3ddo_8nzUrgCyaX_WEIJljx_We-c1`;

	await getPlaylistDuration(playlistId);
	// log(formatDuration(tatalDuration));
	return totalDuration;
}

// run();
