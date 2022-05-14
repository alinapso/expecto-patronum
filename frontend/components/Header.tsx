import Link from "next/link";
import useUser from "lib/useUser";
import Button from "@restart/ui/Button";

import { logout } from "lib/auth";
import { Navbar, Dropdown, Nav, Form, Card, Image } from "react-bootstrap";
import logo from "../assets/images/logo.png";

import user1 from "../assets/images/user/1.jpg";
import user2 from "../assets/images/user/02.jpg";
import user3 from "../assets/images/user/03.jpg";
import user4 from "../assets/images/user/04.jpg";
import user5 from "../assets/images/user/05.jpg";
function HeaderItem() {}
export default function Header() {
  const { user, mutate } = useUser();
  const minisidebar = () => {
    document.body.classList.toggle("sidebar-main");
  };
  return (
    <div className="iq-top-navbar">
      <div className="iq-navbar-custom">
        <Navbar expand="lg" variant="light" className="p-0">
          <div className="iq-navbar-logo d-flex justify-content-between">
            <div className="iq-menu-bt align-self-center">
              <div className="wrapper-menu" onClick={minisidebar}>
                <div className="main-circle">
                  <i className="ri-menu-line"></i>
                </div>
              </div>
            </div>
            <Link href="/">
              <>
                <span>Expecto Patronum</span>
              </>
            </Link>
          </div>
          <Navbar.Toggle as="button">
            <i className="ri-menu-3-line"></i>
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav as="ul" className="ms-auto navbar-list">
              <li>
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              {!user && (
                <>
                  <li>
                    <Link href="/signin">
                      <a>Login</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/signup">
                      <a>Sign Up</a>
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <Link href="/profile-sg">
                      <a>
                        <span
                          style={{
                            marginRight: ".3em",
                            verticalAlign: "middle",
                            borderRadius: "100%",
                            overflow: "hidden",
                          }}
                        ></span>
                        Profile (Static Generation, recommended)
                      </a>
                    </Link>
                  </li>

                  <li>
                    <a
                      href="/api/logout"
                      onClick={async (e) => {
                        e.preventDefault();
                        logout();
                        mutate();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
