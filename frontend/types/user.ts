import { User } from "expecto-patronum-common";

export interface UserWeb extends User {
  access_token?: string;
  is_logged_in: boolean;
}
