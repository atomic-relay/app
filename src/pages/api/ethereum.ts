// import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";
//
// const settings = {
// 	apiKey: 'Gou-7qtS5tPJuLE90NkfVa7-T2sjWVhF', // Replace with your Alchemy API Key.
// 	network: Network.ETH_SEPOLIA, // Replace with your network.
// };
//
// const pk = process.env.ALCHEMY_PRIVATE_KEY || ''
// const alchemy = new Alchemy(settings);
//
// // Optional Config object, but defaults to demo api-key and eth-mainnet.
// async function main() {
// 	const txHash =
// 		"0xd488331be3a2f9cdd0f2b351f2b13f5151630aaafd2c2b246f7f3cd7fd0b1dfc";
//
// 	// Getting the status of the transaction using getTransactionReceipt and logging accordingly
// 	// @ts-ignore
// 	alchemy.core.getTransactionReceipt(txHash).then((tx) => {
// 		if (!tx) {
// 			console.log("Pending or Unknown Transaction");
// 		} else if (tx.status === 1) {
// 			console.log("Transaction was successful!");
// 		} else {
// 			console.log("Transaction failed!");
// 		}
// 	});
// 	console.log('loading')
// 	const latestBlock = await alchemy.core.getBlockNumber();
// 	console.log("The latest block number is", latestBlock);
// }
//
// async function send() {
// 	let wallet = new Wallet(pk);
// 	const nonce = await alchemy.core.getTransactionCount(
// 		wallet.address,
// 		"latest"
// 	);
//
// 	let transaction = {
// 		to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
// 		value: Utils.parseEther("0.001"),
// 		gasLimit: "21000",
// 		maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
// 		maxFeePerGas: Utils.parseUnits("20", "gwei"),
// 		nonce: nonce,
// 		type: 2,
// 		chainId: 11155111,
// 	};
//
// 	let rawTransaction = await wallet.signTransaction(transaction);
// 	let tx = await alchemy.core.sendTransaction(rawTransaction);
// 	console.log("Sent transaction", tx);
// }
//
// send();
