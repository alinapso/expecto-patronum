/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: "/:path*",
	// 			destination: "http://localhost:3333/:path*",
	// 		},
	// 	];
	// },
};
