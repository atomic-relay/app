import { NextApiRequest, NextApiResponse } from "next";

export default function helloWorldHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // @ts-ignore
  switch (req.method.toLowerCase()) {
    case `get`:
      return res.send(`Hello World`);
    case `post`:
    // do something else
    default:
      // handle unsupported methods
      return res.status(501).end();
  }
}
