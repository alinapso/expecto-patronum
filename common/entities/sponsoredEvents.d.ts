import Sponsored from "./sponsored";
import UploadedFile from "./uploadedFile";

export declare type SponsoredEvents = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	eventDate: Date;
	title: string;
	description: string;
	files: UploadedFile[];
	sponsored: Sponsored;
	sponsoredId: string;
};
export default SponsoredEvents;
