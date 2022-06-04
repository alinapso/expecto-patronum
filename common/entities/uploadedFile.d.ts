import SponsoredEvents from "./SponsoredEvents";
import Sponsored from "./Sponsored";
export declare const FileCategory: {
	PROFILE: 1;
	IMAGE: 2;
	DOC: 3;
};
export declare type UploadedFile = {
	id: string;
	title: string;
	postfix: string;
	fileCategory: FileCategory;
	SponsoredEvents: SponsoredEvents | null;
	sponsoredEventsId: string | null;
	Sponsored: Sponsored[];
};
export type FileCategory = typeof FileCategory[keyof typeof FileCategory];

export default UploadedFile;
