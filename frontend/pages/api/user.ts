import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { User, Role } from "expecto-patronum-common";
import { UserWeb } from "types/user";
export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<UserWeb>) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
    });
  } else {
    res.status(401);
  }
}
