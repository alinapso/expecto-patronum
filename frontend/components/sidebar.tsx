import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { Accordion, AccordionContext } from "react-bootstrap";

export declare type SideBarItem = {
  title: string;
  icon: string;
  href: string;
};

export const SideBarLink = ({ title, icon, href }: SideBarItem) => {
  return (
    <li>
      <Link href={href}>
        <a>
          <i className={icon}></i>
          <span>{title}</span>
        </a>
      </Link>
    </li>
  );
};

const Sidebar = ({ items }: any) => {
  const [activeMenu, setActiveMenu] = useState(false);
  console.log(items);
  const createNavItems = items?.map((l: SideBarItem) => {
    return SideBarLink(l);
  });

  return (
    <>
      <div className="iq-sidebar">
        <div id="sidebar-scrollbar">
          <nav className="iq-sidebar-menu">
            <Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu">
              {createNavItems}
            </Accordion>
          </nav>
          <div className="p-5"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
