import Link from "next/link";
import Button from "@restart/ui/Button";

import { logout } from "lib/auth";
import { Navbar, Dropdown, Nav, Form, Card, Image } from "react-bootstrap";
import { useUserState, UserStatus } from "context/user";

export default function Header({ navbarEnabled }: any) {
	const { user } = useUserState();

	const minisidebar = () => {
		document.body.classList.toggle("sidebar-main");
	};
	console.log("user", user);
	return (
		<div className="iq-top-navbar">
			<div className="iq-navbar-custom">
				<Navbar expand="lg" variant="light" className="p-0">
					<div className="iq-navbar-logo d-flex justify-content-between">
						<div className="iq-menu-bt align-self-center">
							{navbarEnabled ? (
								<div className="wrapper-menu" onClick={minisidebar}>
									<div className="main-circle">
										<i className="ri-menu-line"></i>
									</div>
								</div>
							) : (
								<></>
							)}
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
							{user.status == UserStatus.LoggedOut && (
								<>
									<li>
										<Link href="/">
											<a>Home</a>
										</Link>
									</li>
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
							{user.status == UserStatus.loggedIn && (
								<>
									<li>
										<Link href="/dashboard">
											<a>
												<span
													style={{
														marginRight: ".3em",
														verticalAlign: "middle",
														borderRadius: "100%",
														overflow: "hidden",
													}}></span>
												Home
											</a>
										</Link>
									</li>

									<li>
										<a
											href="/api/logout"
											onClick={async (e) => {
												e.preventDefault();
												logout();
											}}>
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
