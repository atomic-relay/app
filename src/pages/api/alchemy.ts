const { Network, Alchemy } = require("alchemy-sdk");


// Optional Config object, but defaults to demo api-key and eth-mainnet.
async function main() {

	const settings = {
		apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
		network: Network.ETH_SEPOLIA, // Replace with your network.
	};
	const alchemy = new Alchemy(settings);
	const txHash =
		"0xd488331be3a2f9cdd0f2b351f2b13f5151630aaafd2c2b246f7f3cd7fd0b1dfc";

	// Getting the status of the transaction using getTransactionReceipt and logging accordingly
	// @ts-ignore
	alchemy.core.getTransactionReceipt(txHash).then((tx) => {
		if (!tx) {
			console.log("Pending or Unknown Transaction");
		} else if (tx.status === 1) {
			console.log("Transaction was successful!");
		} else {
			console.log("Transaction failed!");
		}
	});
	console.log('loading')
	const latestBlock = await alchemy.core.getBlockNumber();
	console.log("The latest block number is", latestBlock);
}

main();
