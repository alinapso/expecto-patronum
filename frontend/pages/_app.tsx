import { RemoteApiCall } from "lib/remoteAPI";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "bootstrap/dist/css/bootstrap.min.css";

import "swiper/css/bundle";
import "swiper/css/navigation";
import "../assets/scss/socialv.scss";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: RemoteApiCall,
        onError: (err) => {
          console.error(err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
