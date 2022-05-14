import Head from "next/head";
import Header from "components/Header";
import Sidebar from "./sidebar";

export default function Layout({
  children,
  items,
}: {
  children: React.ReactNode;
  items?: any;
}) {
  return (
    <>
      <Head>
        <title>With Iron Session</title>
      </Head>
      <div className="wrapper">
        {items && items.length > 0 ? <Sidebar items={items} /> : <></>}
        <Header navbarEnabled={items && items.length > 0} />

        <div id="content-page" className="content-page">
          <div className="container">{children}</div>
        </div>
      </div>
    </>
  );
}
function SideBarItem() {
  throw new Error("Function not implemented.");
}
