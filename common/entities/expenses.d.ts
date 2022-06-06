import SponsoredEvents from "./sponsoredEvents";
import UploadedFile from "./uploadedFile";
export declare type Expenses = {
	id: number;
	sum: number;
	title: string;
	sponsoredEventId: string;
	sponsoredEvent: SponsoredEvents;
	uploadedFileId: string;
	uploadedFile: UploadedFile;
};
export default Expenses;
