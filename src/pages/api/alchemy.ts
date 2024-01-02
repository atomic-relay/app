const { Network, Alchemy } = require("alchemy-sdk");


// Optional Config object, but defaults to demo api-key and eth-mainnet.



async function main() {

	const settings = {
		apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
		network: Network.ETH_MAINNET, // Replace with your network.
	};
	const alchemy = new Alchemy(settings);

	console.log('loading')
	const latestBlock = await alchemy.core.getBlockNumber();
	console.log("The latest block number is", latestBlock);
}

main();
