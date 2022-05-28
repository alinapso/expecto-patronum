import { TabPane, Row, Col, Button } from "react-bootstrap";
import FormElemenetDto from "../types/FormElementDto";
import FormSectionDto from "../types/FormSectionDto";
import FormElement from "./FormElement";

const FormSection = ({ sectionDef }: { sectionDef: FormSectionDto }) => {
	return {
		tab: (
			<TabPane
				className={` ${sectionDef.active ? "d-block" : "d-none"} fade row show`}
				id={`${sectionDef.id}`}
				key={sectionDef.id}>
				<Col sm="12">
					<Col md="12" className="p-0">
						<h3 className="mb-4">{sectionDef.title}</h3>
						<Row>
							{sectionDef.elements.map((elem: FormElemenetDto) => (
								<FormElement elementDef={elem} />
							))}
						</Row>
						{sectionDef.isLast ? (
							<Button type="submit" className="btn-primary float-end" data-enchanter="submit">
								Submit
							</Button>
						) : (
							<Button
								className="btn-primary float-end"
								data-enchanter="next"
								onClick={() => (sectionDef.onNextClick ? sectionDef.onNextClick(sectionDef.id) : {})}>
								Next
							</Button>
						)}
					</Col>
				</Col>
			</TabPane>
		),
		nav: (
			<Button
				className={` ${sectionDef.active ? "active done" : ""} btn nav-link`}
				onClick={() => (sectionDef.onNavClick ? sectionDef.onNavClick(sectionDef.id) : {})}
				role="tab">
				<i className={sectionDef.icon}></i>
				<span>{sectionDef.title}</span>
			</Button>
		),
	};
};

export default FormSection;
