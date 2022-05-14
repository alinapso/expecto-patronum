import Head from "next/head";
import Header from "components/Header";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>With Iron Session</title>
      </Head>
      <div className="wrapper">
        <Sidebar />
        <Header />

        <div id="content-page" className="content-page">
          <div className="container">{children}</div>
        </div>
      </div>
    </>
  );
}
