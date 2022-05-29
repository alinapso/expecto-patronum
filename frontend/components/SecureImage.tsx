import { RemoteApiCall } from "lib/remoteAPI";

const SecureFile = async (file: string) => {
	const res = await RemoteApiCall({
		method: "GET",
		url: `/uploaded-file/${file}`,
	});
	//console.log(res);
};
export default SecureFile;
