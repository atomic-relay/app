import * as jose from "jose";
import type { NextApiRequest, NextApiResponse } from "next";
import { KeyObject } from "crypto";

interface JwtKeyPairData {
  jwtPublicSigningKey: string;
  jwtPrivateSigningKey: string;
}

/**
 * Generates JWT key pair used in minting JWTs.
 * See https://app.lightspark.com/docs/wallet-sdk/authentication
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JwtKeyPairData>,
) {
  const { publicKey, privateKey } =
    await jose.generateKeyPair<KeyObject>("ES256");

  const jwtPublicSigningKey = String(
    publicKey.export({
      type: "spki",
      format: "pem",
    }),
  );
  const jwtPrivateSigningKey = String(
    privateKey.export({
      type: "pkcs8",
      format: "pem",
    }),
  );

  res.status(200).json({
    jwtPublicSigningKey,
    jwtPrivateSigningKey,
  });
}
