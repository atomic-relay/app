import {
  AccountTokenAuthProvider,
  LightsparkClient,
  BitcoinNetwork,
} from "@lightsparkdev/lightspark-sdk";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  main();
}
const main = async () => {
  const client = new LightsparkClient(
    new AccountTokenAuthProvider(
      process.env.NEXT_LIGHTSPARK_API_KEY || "",
      process.env.LIGHTSPARK_SECRET || "",
    ),
  );
  const conductivity = await client.executeRawQuery({
    queryPayload: `query MyCustomQuery($network) {
      fee_estimate(bitcoin_networks: [$network]) {
        fee_fast
        fee_min
      }
    }`,
    variables: { network: BitcoinNetwork.MAINNET },
    constructObject: (json) => json["fee_estimate"],
  });
  console.log(`My conductivity on MAINNET is ${conductivity}.`);
};
