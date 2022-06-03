import Sponsored from "./sponsored";
import Transactions from "./Transactions";
export declare const Role: {
	PATRON: "PATRON";
	ADMIN: "ADMIN";
};
export declare type User = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	email: string;
	hash: string;
	firstName: string | null;
	lastName: string | null;
	Address: string | null;
	role: Role | null;
	Sponsored?: Sponsored[] | null;
	Transactions?: Transactions[] | null;
};

export type Role = typeof Role[keyof typeof Role];

export default User;
