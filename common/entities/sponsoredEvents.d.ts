import Expenses from "./expenses";
import Sponsored from "./sponsored";
import UploadedFile from "./uploadedFile";

export declare type SponsoredEvents = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	eventDate: Date;
	title: string;
	description: string;
	sponsoredId: string;
	sponsored: Sponsored;
	Expenses: Expenses[];
	files: UploadedFile[];
};
export default SponsoredEvents;
