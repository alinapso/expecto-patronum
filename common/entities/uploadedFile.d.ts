import SponsoredEvents from "./SponsoredEvents";
import Sponsored from "./Sponsored";

export declare type UploadedFile = {
	id: string;
	title: string;
	postfix: string;
	fileCategory: number;
	SponsoredEvents: SponsoredEvents | null;
	sponsoredEventsId: string | null;
	Sponsored: Sponsored[];
};
export default UploadedFile;
