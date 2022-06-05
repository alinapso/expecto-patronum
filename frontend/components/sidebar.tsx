import React from "react";
import Link from "next/link";
import { Accordion } from "react-bootstrap";

export declare type SideBarItem = {
	title: string;
	icon: string;
	href: string;
};

const Sidebar = ({ items }: { items: SideBarItem[] }) => {
	return (
		<>
			<div className="iq-sidebar">
				<div id="sidebar-scrollbar">
					<nav className="iq-sidebar-menu">
						<Accordion as="ul" id="iq-sidebar-toggle" className="iq-menu">
							{items?.map((l) => (
								<li key={l.title}>
									<Link href={l.href}>
										<a>
											<i className={l.icon}></i>
											<span>{l.title}</span>
										</a>
									</Link>
								</li>
							))}
						</Accordion>
					</nav>
					<div className="p-5"></div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;
