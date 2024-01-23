import { Alchemy, Network, Wallet, Utils } from "alchemy-sdk";
async function send() {
  const settings = {
    apiKey: "Gou-7qtS5tPJuLE90NkfVa7-T2sjWVhF", // Replace with your Alchemy API Key.
    network: Network.ETH_SEPOLIA, // Replace with your network.
  };
  const pk = process.env.ALCHEMY_PRIVATE_KEY || "";
  const alchemy = new Alchemy(settings);
  const wallet = new Wallet(pk);
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    "latest",
  );

  let transaction = {
    to: "0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd",
    value: Utils.parseEther("0.001"),
    gasLimit: "21000",
    maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
    maxFeePerGas: Utils.parseUnits("20", "gwei"),
    nonce: nonce,
    type: 2,
    chainId: 11155111,
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log("Sent transaction", tx);
}

send();
