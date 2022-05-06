import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
export enum Role {
  PATRON,
  ADMIN,
}
export type User = {
  isLoggedIn: boolean;
  login: string;
  userInfo?: UserInfo;
};
export type UserInfo = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  hash: string;
  firstName: string | null;
  lastName: string | null;
  Address: string | null;
  role: Role | null;
};

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    res.json({
      isLoggedIn: false,
      login: "",
    });
  }
}
