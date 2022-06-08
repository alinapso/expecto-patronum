import SponsoredEvents from "./sponsoredEvents";
import UploadedFile from "./uploadedFile";
export declare type Expenses = {
	id?: string;
	sum: number;
	title: string;
	sponsoredEventId?: string;
	sponsoredEvent?: SponsoredEvents;
	uploadedFileId?: string;
	UploadedFile?: UploadedFile;
};
export default Expenses;
