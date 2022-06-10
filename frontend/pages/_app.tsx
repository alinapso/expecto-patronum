import { RemoteApiCall } from "lib/remoteAPI";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/css/bundle";
import "swiper/css/navigation";
import "../assets/scss/expectoPatrunom.scss";
import React from "react";
import { UserProvider } from "../context/user";
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<UserProvider>
			<Component {...pageProps} />
		</UserProvider>
	);
}

export default MyApp;
