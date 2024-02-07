import type { NextApiRequest, NextApiResponse } from "next";
import Database from "@replit/database";

const db = new Database();

/**
 * Deletes all secrets from the Replit db.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  db.delete("ACCOUNT_ID");
  db.delete("jwt_private_signing_key");
  db.delete("jwt_public_signing_key");

  res.status(200).json({});
}
