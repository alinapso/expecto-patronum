import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import { User, Role } from "expecto-patronum-common";
import { UserWeb } from "types/user";
export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    res.json({
      ...req.session.user,
      is_logged_in: true,
    });
  } else {
    res.status(401).json({ is_logged_in: false });
  }
}
