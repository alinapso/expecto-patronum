import { useRef, useState } from "react";
import { Button, Form, Nav, TabContent } from "react-bootstrap";
import FormSection from "./components/FormSection";
import FormSectionDto from "./types/FormSectionDto";

const DynamicForm = ({ tabs, handleSubmit }: { tabs: FormSectionDto[]; handleSubmit: (event: any) => void }) => {
	const [activeTab, setActiveTab] = useState(1);
	if (tabs.length < 1) return <h1>your form is empty!</h1>;
	const generateForm = (tabs: FormSectionDto[]) => {
		let navItems: JSX.Element[] = [];
		let formItems: JSX.Element[] = [];
		tabs[tabs.length - 1].isLast = true;
		tabs.forEach((tabPair) => {
			tabPair.active = activeTab == tabPair.id;
			tabPair.onNavClick = onNavClick;
			tabPair.onNextClick = onNextClick;

			const { tab, nav } = FormSection({ sectionDef: tabPair });
			navItems.push(nav);
			formItems.push(tab);
		});
		const current = formRef ? (formRef.current ? formRef.current : {}) : {};

		return { navItems, formItems };
	};
	const formRef = useRef({});
	const onNavClick = (id: number) => {
		console.log(id);
		setActiveTab(id);
	};
	const onNextClick = (id: number) => {
		console.log(id);
		setActiveTab(id + 1);
	};
	const handleSubmit2 = (event: any) => {
		event.preventDefault();
		let values: any = {};
		tabs.forEach((tab) => {
			tab.elements.forEach((elem) => {
				values[elem.name] = elem.ref?.current.value;
			});
		});
		console.log(values);
	};
	const { navItems, formItems } = generateForm(tabs);

	return (
		<Form method="post" id="registration" onSubmit={handleSubmit2}>
			{navItems.length > 1 ? (
				<Nav fill variant="pills" className="stepwizard-row" id="nav-tab" role="tablist">
					{navItems}
				</Nav>
			) : (
				<></>
			)}

			<TabContent className="pt-4 pb-2" id="nav-tabContent">
				{formItems}
			</TabContent>
		</Form>
	);
};
export default DynamicForm;
