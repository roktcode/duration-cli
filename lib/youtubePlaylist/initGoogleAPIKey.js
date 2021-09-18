import enquirer from "enquirer";
import persistAPIKey from "./persistAPIKey.js";

const { prompt } = enquirer;

export default async function getAPIKey() {
	const response = await prompt({
		type: "input",
		name: "apiKey",
		message: "Google API Key",
		required: true,
	});

	await persistAPIKey(response.apiKey);

}