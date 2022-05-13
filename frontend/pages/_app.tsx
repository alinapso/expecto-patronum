import { RemoteApiCall } from "lib/remoteAPI";
import { AppProps } from "next/app";
import { SWRConfig } from "swr";
import "semantic-ui-css/semantic.min.css";

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
