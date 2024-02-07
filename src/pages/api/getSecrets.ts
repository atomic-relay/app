import type { NextApiRequest, NextApiResponse } from "next";
import Database from "@replit/database";

const db = new Database();

interface GetSecretsData {
  accountId?: string;
  jwtPublicSigningKey?: string;
  jwtPrivateSigningKey?: string;
}

interface GetSecretsError {
  message: string;
}

/**
 * Retrieves the saved secrets from the Replit db.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSecretsData | GetSecretsError>,
) {
  try {
    const accountId = (await db.get("ACCOUNT_ID")) as string | undefined;
    const jwtPrivateSigningKey = (await db.get("jwt_private_signing_key")) as
      | string
      | undefined;
    const jwtPublicSigningKey = (await db.get("jwt_public_signing_key")) as
      | string
      | undefined;

    res.status(200).json({
      accountId,
      jwtPrivateSigningKey,
      jwtPublicSigningKey,
    });
  } catch (e: any) {
    console.error("Error getting secrets:", e);
    res.status(400).json({
      message: e.message,
    });
  }
}
