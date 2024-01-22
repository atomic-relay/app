import { AccountTokenAuthProvider, LightsparkClient, BitcoinNetwork } from "@lightsparkdev/lightspark-sdk";
const API_TOKEN_CLIENT_ID = '018cea3f48b24f890000cd68bef8115e'
const API_TOKEN_CLIENT_SECRET = 'KSTHhHugjXnHPwilBY2mYVxf4ecNEL2JSFkqxL4nrIY'


const  main = async () => {
	const client = new LightsparkClient(
		new AccountTokenAuthProvider(API_TOKEN_CLIENT_ID, API_TOKEN_CLIENT_SECRET)
	);
	const conductivity = await client.executeRawQuery({
		queryPayload: `query MyCustomQuery($network) {
		  current_account {
		    id
		    conductivity(bitcoin_networks: [$network])
		  }
		}`,
		variables: { "network": BitcoinNetwork.MAINNET },
		constructObject: (json) => json["current_account"]["conductivity"]
	});

	console.log(`My conductivity on MAINNET is ${conductivity}.`)
}

main()