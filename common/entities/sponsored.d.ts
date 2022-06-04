import UploadedFile from "./uploadedFile";
import { User } from "./user";
import SponsoredEvents from "./sponsoredEvents";

export declare type Sponsored = {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	firstName: string;
	middleName: string;
	fatherName: string;
	lastName: string;
	birthDate: Date;
	placeOfBirth: string;
	description: string;
	profilePic?: UploadedFile | null;
	isActive: Boolean;
	patron?: User | null;
	patronId?: string;
	monthlyDum: number | null;
	startDate: Date | null;
	endDate: Date | null;
	dayOfTransaction: number | null;
	SponsoredEvents: SponsoredEvents[];
	uploadedFileId: string | null;
};

export default Sponsored;
