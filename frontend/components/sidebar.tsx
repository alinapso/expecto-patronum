import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { Accordion, AccordionContext } from "react-bootstrap";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  return (
    <>
      <div className="iq-sidebar">
        <div id="sidebar-scrollbar">
          <nav className="iq-sidebar-menu">
            <Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu">
              <li>
                <Link href="/">
                  <a>
                    <i className="las la-newspaper"></i>
                    <span>Newsfeed</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/app/profile">
                  <a>
                    <i className="las la-user"></i>

                    <span>Profile</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/dashboards/app/friend-list">
                  <a>
                    <i className="las la-user-friends"></i>
                    <span>Friend List</span>
                  </a>
                </Link>
              </li>
            </Accordion>
          </nav>
          <div className="p-5"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
