import React from "react";
import { useRef, useState } from "react";
import { Alert, Button, Form, Nav, TabContent } from "react-bootstrap";
import { FormSectionTab, FormSectionNav } from "./components/FormSection";
import FormElemenetDto from "./types/FormElementDto";
import FormSectionDto from "./types/FormSectionDto";

type DynamicFormProps = {
	tabs: FormSectionDto[];
	handleSubmit: (event: any) => void;
	showNav?: boolean;
	initValue?: any;
};
type DynamicFormState = {
	tabs: FormSectionDto[];
	activeTab: number;
	showAlert: { show: boolean; error: string };
};
class DynamicForm extends React.Component<DynamicFormProps> {
	constructor(props: DynamicFormProps) {
		super(props);

		this.props.tabs[this.props.tabs.length - 1].isLast = true;
		this.props.tabs.forEach((tab) => {
			tab.active = this.state.activeTab == tab.id;
			tab.onNavClick = this.onNavClick;
			tab.onNextClick = this.onNextClick;
			tab.elements.forEach((elem) => {
				if (this.props.initValue && this.props.initValue[elem.id]) {
					elem.initValue = this.props.initValue[elem.id];
				}
			});
		});
		this.state = {
			tabs: this.props.tabs,
			activeTab: 1,
			showAlert: { show: false, error: "" },
		};
	}

	state: DynamicFormState = {
		activeTab: 1,
		showAlert: { show: false, error: "" },
		tabs: [],
	};
	onNavClick = (id: number) => {
		this.setState((state) => ({
			activeTab: id,
		}));
	};
	onNextClick = (id: number) => {
		let isValid: boolean = true;
		for (const elem of this.state.tabs[id - 1].elements) {
			if (elem.required) {
				if (!elem.ref || elem.ref?.current.value === "") {
					elem.ref?.current.focus();
					let errorValue = `${elem.labelText} is required!`;
					this.setState((state) => ({
						setShowAlert: { show: true, error: errorValue },
					}));

					isValid = false;
					console.log("error");
					return;
				}
			}
		}
		const nextTab = this.state.activeTab + 1;
		const copy = [...this.state.tabs];
		copy.forEach((tab) => {
			tab.active = nextTab === tab.id;
		});
		this.setState((state) => ({
			tabs: copy,
			activeTab: nextTab,
			showAlert: { show: false, error: "" },
		}));
	};
	handleFormSubmit = (event: any) => {
		event.preventDefault();
		let values: any = {};
		this.state.tabs.forEach((tab) => {
			tab.elements.forEach((elem) => {
				values[elem.name] = elem.ref?.current.value;
			});
		});
		this.props.handleSubmit(values);
	};

	render() {
		if (this.state.tabs.length < 1) return <h1>your form is empty!</h1>;
		return (
			<Form method="post" id="registration" onSubmit={this.handleFormSubmit}>
				{this.props.showNav && this.state.tabs.length > 1 ? (
					<Nav fill variant="pills" className="stepwizard-row" id="nav-tab" role="tablist">
						{this.state.tabs.map((tab: FormSectionDto) => {
							return <FormSectionNav sectionDef={tab} key={`nav-${tab.id}`} />;
						})}
					</Nav>
				) : (
					<></>
				)}
				<Alert
					variant="alert alert-warning alert-solid rounded-0  mb-3"
					show={this.state.showAlert.show}
					role="alert"
					onClose={() =>
						this.setState((state) => ({
							setShowAlert: { show: false, error: "" },
						}))
					}
					dismissible>
					<span>
						<i className="far fa-life-ring"></i>
					</span>
					<span> {this.state.showAlert.error}</span>
				</Alert>
				<TabContent className=" pb-2" id="nav-tabContent">
					{this.state.tabs.map((tab: FormSectionDto) => {
						return <FormSectionTab sectionDef={tab} key={`tab-${tab.id}`} />;
					})}
				</TabContent>
			</Form>
		);
	}
}
export default DynamicForm;
