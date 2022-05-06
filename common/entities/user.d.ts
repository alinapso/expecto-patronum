export declare const Role: {
  PATRON: "PATRON";
  ADMIN: "ADMIN";
};
export declare type User = {
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

export type Role = typeof Role[keyof typeof Role];

export default { Role, User };
