import { withIronSessionApiRoute } from "iron-session/next/dist";
import { RemoteApiCall } from "lib/remoteAPI";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      return await handlePOST(req, res);
    }
    case "GET": {
      return await handleGET(req, res);
    }
    default: {
      res.status(400).send(`this endpoint does not support ${req.method}`);
      break;
    }
  }
}
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {}
async function handleGET(req: NextApiRequest, res: NextApiResponse) {}
