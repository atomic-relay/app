import { Alchemy, Network, Wallet } from "alchemy-sdk";
export const settings = {
	apiKey: 'Gou-7qtS5tPJuLE90NkfVa7-T2sjWVhF', // Replace with your Alchemy API Key.
	network: Network.ETH_SEPOLIA, // Replace with your network.
};

export const pk = process.env.ALCHEMY_PRIVATE_KEY || ''
export const alchemy = new Alchemy(settings);

export const wallet = new Wallet(pk);
