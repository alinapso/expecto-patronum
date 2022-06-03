import { useRef, useState } from "react";
import { Alert, Button, Form, Nav, TabContent } from "react-bootstrap";
import { FormSectionTab, FormSectionNav } from "./components/FormSection";
import FormElemenetDto from "./types/FormElementDto";
import FormSectionDto from "./types/FormSectionDto";

const DynamicForm = ({
	tabs,
	handleSubmit,
	showNav,
}: {
	tabs: FormSectionDto[];
	handleSubmit: (event: any) => void;
	showNav?: boolean;
}) => {
	const [activeTab, setActiveTab] = useState(1);
	const [showAlert, setShowAlert] = useState({ show: false, error: "" });
	if (tabs.length < 1) return <h1>your form is empty!</h1>;
	let errorValue = "";
	const onNavClick = (id: number) => {
		setActiveTab(id);
	};
	const onNextClick = (id: number) => {
		let isValid: boolean = true;
		for (const elem of tabs[id - 1].elements) {
			if (elem.required) {
				if (!elem.ref || elem.ref?.current.value === "") {
					elem.ref?.current.focus();
					errorValue = `${elem.labelText} is required!`;
					setShowAlert({ show: true, error: errorValue });
					isValid = false;
					return;
				}
			}
		}
		setShowAlert({ show: false, error: "" });
		setActiveTab(id + 1);
	};
	const handleFormSubmit = (event: any) => {
		event.preventDefault();
		let values: any = {};
		tabs.forEach((tab) => {
			tab.elements.forEach((elem) => {
				values[elem.name] = elem.ref?.current.value;
			});
		});
		handleSubmit(values);
	};
	tabs[tabs.length - 1].isLast = true;
	tabs.forEach((tab) => {
		tab.active = activeTab == tab.id;
		tab.onNavClick = onNavClick;
		tab.onNextClick = onNextClick;
	});
	console.log(showNav);
	return (
		<Form method="post" id="registration" onSubmit={handleFormSubmit}>
			{showNav && tabs.length > 1 ? (
				<Nav fill variant="pills" className="stepwizard-row" id="nav-tab" role="tablist">
					{tabs.map((tab: FormSectionDto) => {
						return <FormSectionNav sectionDef={tab} key={`nav-${tab.id}`} />;
					})}
				</Nav>
			) : (
				<></>
			)}
			<Alert
				variant="alert alert-warning alert-solid rounded-0  mb-3"
				show={showAlert.show}
				role="alert"
				onClose={() => setShowAlert({ show: false, error: "" })}
				dismissible>
				<span>
					<i className="far fa-life-ring"></i>
				</span>
				<span> {showAlert.error}</span>
			</Alert>
			<TabContent className="pt-4 pb-2" id="nav-tabContent">
				{tabs.map((tab: FormSectionDto) => {
					return <FormSectionTab sectionDef={tab} key={`tab-${tab.id}`} />;
				})}
			</TabContent>
		</Form>
	);
};
export default DynamicForm;
