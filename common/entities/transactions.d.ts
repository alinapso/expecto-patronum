import Sponsored from "./sponsored";
import User from "./user";

export declare type Transactions = {
	id: number;
	sum: number;
	patron: User;
	patronId: number;
	sponsoredId: string;
	Sponsored: Sponsored;
	createdAt: Date;
	updatedAt: Date;
};
export default Transactions;
