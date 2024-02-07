import type { NextApiRequest, NextApiResponse } from "next";
import Database from "@replit/database";

const db = new Database();

interface GetWalletPrivateKeyData {
  encodedPrivateKey?: string;
}

interface GetWalletPrivateKeyError {
  message: string;
}

/**
 * Retrieves the saved wallet private key for a given wallet ID.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetWalletPrivateKeyData | GetWalletPrivateKeyError>,
) {
  const { walletId } = req.query;
  if (!walletId) {
    res.status(400).json({
      message: "Missing walletId query parameter",
    });
    return;
  }

  try {
    const encodedPrivateKey = (await db.get(`${walletId}_privateKey`)) as
      | string
      | undefined;
    res.status(200).json({
      encodedPrivateKey,
    });
  } catch (e: any) {
    console.error("Error getting wallet private key:", e);
    res.status(400).json({
      message: e.message,
    });
  }
}
