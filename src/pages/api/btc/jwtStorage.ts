import type { NextApiRequest, NextApiResponse } from "next";
import Database from "@replit/database";

const db = new Database();

interface JwtTokenInfo {
  accessToken: string;
  validUntil: string;
}

interface ErrorMsg {
  error: string;
}

/**
 * Endpoint for storing and retrieving a JWT in the Replit db.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<JwtTokenInfo | ErrorMsg | {}>,
) {
  if (req.method === "GET") {
    await handleGet(req, res);
  } else if (req.method === "POST") {
    await handlePost(req, res);
  } else if (req.method === "DELETE") {
    await handleDelete(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function handleGet(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const { userName, blockchainNetwork, deploymentEnvironment } = req.query;

  if (!userName || !blockchainNetwork || !deploymentEnvironment) {
    res.status(400).send({
      error: "Missing userName, blockchainNetwork or deploymentEnvironment",
    });
    return;
  }

  const data = (await db.get(
    getTokenInfoKey(userName, blockchainNetwork, deploymentEnvironment),
  )) as JwtTokenInfo;
  if (!data) {
    res.status(404).send({ error: "No token found" });
    return;
  }

  res.status(200).json(data);
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const {
    userName,
    blockchainNetwork,
    deploymentEnvironment,
    accessToken,
    validUntil,
  } = JSON.parse(req.body);
  console.log(
    "setting token info",
    getTokenInfoKey(userName, blockchainNetwork, deploymentEnvironment),
    accessToken,
    validUntil,
  );

  if (
    !userName ||
    !blockchainNetwork ||
    !deploymentEnvironment ||
    !accessToken ||
    !validUntil
  ) {
    res.status(400).send({
      error:
        "Missing userName, blockchainNetwork, deploymentEnvironment, accessToken, or validUntil",
    });
    return;
  }

  db.set(getTokenInfoKey(userName, blockchainNetwork, deploymentEnvironment), {
    accessToken,
    validUntil,
  });
  res.status(201).json({});
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { userName, blockchainNetwork, deploymentEnvironment } = JSON.parse(
    req.body,
  );

  if (!userName || !blockchainNetwork || !deploymentEnvironment) {
    res.status(400).send({
      error: "Missing userName, blockchainNetwork, or deploymentEnvironment",
    });
    return;
  }

  db.delete(
    getTokenInfoKey(userName, blockchainNetwork, deploymentEnvironment),
  );
  res.status(204).end();
}

function getTokenInfoKey(
  userName: string | string[],
  blockchainNetwork: string | string[],
  deploymentEnvironment: string | string[],
) {
  return `${userName}-${blockchainNetwork}-${deploymentEnvironment}-tokenInfo`;
}
