import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import Database from "@replit/database";
import { BlockchainNetwork } from "@/providers/EnvironmentSettingsProvider";

const db = new Database();

interface JwtData {
  accountId: string;
  token: string;
}

interface ErrorMsg {
  error: string;
}

/**
 * Generates a JWT.
 * See https://app.lightspark.com/docs/wallet-sdk/authentication
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JwtData | ErrorMsg>,
) {
  const accountId = (await db.get("ACCOUNT_ID")) as string | undefined;
  if (!accountId) {
    res.status(400).send({ error: "Missing ACCOUNT_ID." });
    return;
  }

  const jwtPrivateKey = (await db.get("jwt_private_signing_key")) as
    | string
    | undefined;
  if (!jwtPrivateKey) {
    res.status(400).send({ error: "Missing jwt_private_signing_key." });
    return;
  }

  const { userName, blockchainNetwork, deploymentEnvironment } = req.query;
  if (!userName || !blockchainNetwork || !deploymentEnvironment) {
    res.status(400).send({
      error: "Missing username or blockchainNetwork or deploymentEnvironment",
    });
    return;
  }

  const isUserValid = await checkOrCreateUser(
    userName,
    blockchainNetwork,
    deploymentEnvironment,
  );
  if (!isUserValid) {
    res.status(401).send({ error: "Invalid user" });
    return;
  }

  const claims = {
    aud: "https://api.lightspark.com",
    sub: userName,
    test: isTestBlockchainNetwork(blockchainNetwork as string),
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
  };
  console.log("claims", claims);

  const token = jwt.sign(claims, jwtPrivateKey, { algorithm: "ES256" });

  console.log("Generating JWT for a user", { userName, accountId, token });
  res.status(200).json({
    accountId,
    token,
  });
}

const isTestBlockchainNetwork = (blockchainNetwork: string) => {
  switch (blockchainNetwork) {
    case "MAINNET":
    case "TESTNET":
      return false;
    case "REGTEST":
    default:
      return true;
  }
};

/**
 * Checks if the user exists in the database for a given blockchain network.
 */
const checkOrCreateUser = async (
  userName: string | string[],
  blockchainNetwork: string | string[],
  deploymentEnvironment: string | string[],
) => {
  const key = `${userName}-${blockchainNetwork}-${deploymentEnvironment}`;
  const existingUser = await db.get(key);
  if (existingUser) {
    return true;
  }

  db.set(key, "test");
  return true;
};
