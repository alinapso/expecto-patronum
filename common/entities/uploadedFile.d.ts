import SponsoredEvents from "./sponsoredEvents";
import Sponsored from "./sponsored";
export declare const FileCategory: {
	PROFILE: "PROFILE";
	IMAGE: "IMAGE";
	DOC: "DOC";
};
export declare type UploadedFile = {
	id: string;
	title: string;
	postfix: string;
	fileCategory: FileCategory;
	SponsoredEvents?: SponsoredEvents | null;
	sponsoredEventsId?: string | null;
	Sponsored?: Sponsored[];
};
export type FileCategory = typeof FileCategory[keyof typeof FileCategory];

export default UploadedFile;
