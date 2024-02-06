import type { NextApiRequest, NextApiResponse } from "next";
import Database from "@replit/database";

const db = new Database();

/**
 * Saves secrets to the Replit db.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  const { accountId, jwtPublicKey, jwtPrivateKey } = JSON.parse(req.body);

  db.set("ACCOUNT_ID", accountId);
  db.set("jwt_public_signing_key", jwtPublicKey);
  db.set("jwt_private_signing_key", jwtPrivateKey);
  console.log("saved new config", { accountId, jwtPublicKey, jwtPrivateKey });

  res.status(200).json();
}
