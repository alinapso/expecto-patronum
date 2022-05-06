import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { RemoteApiCall } from "lib/remoteAPI";
import { User } from "expecto-patronum-common";
import { UserWeb } from "types/user";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body;

  try {
    const loginAttampt = await RemoteApiCall(
      "POST",
      "/auth/signin",
      undefined,
      body
    );
    console.log(loginAttampt);
    const user = {
      ...loginAttampt.data,
    } as UserWeb;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
