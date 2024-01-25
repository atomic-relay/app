import {
  AccountTokenAuthProvider,
  LightsparkClient,
  BitcoinNetwork,
} from "@lightsparkdev/lightspark-sdk";

const main = async () => {
  const client = new LightsparkClient(
    new AccountTokenAuthProvider(
      process.env.NEXT_LIGHTSPARK_API_KEY || "",
      process.env.LIGHTSPARK_SECRET || "",
    ),
  );
  const conductivity = await client.executeRawQuery({
    queryPayload: `query MyCustomQuery($network) {
		  current_account {
		    id
		    conductivity(bitcoin_networks: [$network])
		  }
		}`,
    variables: { network: BitcoinNetwork.MAINNET },
    constructObject: (json) => json["current_account"]["conductivity"],
  });
  console.log(`My conductivity on MAINNET is ${conductivity}.`);
};

main();
