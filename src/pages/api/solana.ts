const axios = require("axios");

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';

async function  getProgramAccountsExample() {
	let gPAExampleRequest = {
		"method": "alchemy_getProgramAccounts",
		"params": [
			"ZETAxsqBRek56DhiGXrn75yj2NHU3aYUnxvHXpkf3aD",
			{
				"encoding": "base64",
				"withContext": true,
				"order": "desc"
			}
		],
		"id": 0,
		"jsonrpc": "2.0"
	}
	// @ts-ignore
	let programAccounts = []
	const alchemyRPCUrl = `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
	try {
		let response = await axios.post(alchemyRPCUrl, gPAExampleRequest);
		let responseData = response.data["result"]

		// continue aggregating if there's a new pageKey present in the latest response
		while (responseData["pageKey"]) {
			// @ts-ignore
			programAccounts = programAccounts.concat(responseData["value"]);

			// place the pagekey within the optional config object
			// (you may need to create that config object if you didn't have it originally)
			// @ts-ignore
			gPAExampleRequest["params"][1]["pageKey"] = responseData["pageKey"];

			// make another call to getProgramAccounts with the pageKey
			response = await axios.post(alchemyRPCUrl, gPAExampleRequest);
			responseData = response.data["result"]
		}

		programAccounts = programAccounts.concat(responseData["value"]);
		return programAccounts;
	} catch (err) {
		// @ts-ignore
		console.error(`Error in Response, Data is: ${err.data}`);
		return [];
	}
}
