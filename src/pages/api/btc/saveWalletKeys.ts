import type { NextApiRequest, NextApiResponse } from "next";
import Database from "@replit/database";

const db = new Database();

/**
 * Saves wallet keys to the Replit db for a given wallet ID.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>,
) {
  const { walletId, encodedPublicKey, encodedPrivateKey } = JSON.parse(
    req.body,
  );

  db.set(`${walletId}_publicKey`, encodedPublicKey);
  db.set(`${walletId}_privateKey`, encodedPrivateKey);

  res.status(200).json();
}
