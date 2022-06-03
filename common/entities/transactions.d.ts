import User from "./User";

export declare type Transactions = {
	id: number;
	sum: number;
	patron: User;
	patronId: number;
	createdAt: Date;
	updatedAt: Date;
};
export default Transactions;
