import type { User } from "./user";

import { Octokit } from "octokit";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { RemoteApiCall } from "lib/remoteAPI";
const octokit = new Octokit();

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
      isLoggedIn: true,
      login: "",
      userInfo: loginAttampt,
    } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
