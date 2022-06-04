import { useRef } from "react";
import { TabPane, Row, Col, Button } from "react-bootstrap";
import FormElemenetDto from "../types/FormElementDto";
import FormSectionDto from "../types/FormSectionDto";
import FormElement from "./FormElement";

export const FormSectionTab = ({ sectionDef }: { sectionDef: FormSectionDto }) => {
	return (
		<TabPane
			className={` ${sectionDef.active ? "d-block" : "d-none"}  fade row show`}
			id={`${sectionDef.id}`}
			key={sectionDef.id}>
			<Col md="12" className="p-3">
				<h3 className="mb-4">{sectionDef.title}</h3>
				<Row>
					{sectionDef.elements.map((elem: FormElemenetDto) => (
						<FormElement elementDef={elem} key={elem.id} />
					))}
				</Row>
				{sectionDef.isLast ? (
					<Button type="submit" className="btn-primary float-end" data-enchanter="submit">
						Submit
					</Button>
				) : (
					<Button
						key={sectionDef.id}
						className="btn-primary float-end"
						data-enchanter="next"
						onClick={() => (sectionDef.onNextClick ? sectionDef.onNextClick(sectionDef.id) : {})}>
						Next
					</Button>
				)}
			</Col>
		</TabPane>
	);
};
export const FormSectionNav = ({ sectionDef }: { sectionDef: FormSectionDto }) => {
	return (
		<Button
			className={` ${sectionDef.active ? "active done" : ""} btn nav-link`}
			onClick={() => (sectionDef.onNavClick ? sectionDef.onNavClick(sectionDef.id) : {})}
			role="tab">
			<i className={sectionDef.icon}></i>
			<span>{sectionDef.title}</span>
		</Button>
	);
};
