import { Sponsored } from "expecto-patronum-common";
import { Modal } from "react-bootstrap";
import DynamicForm from "./Form";

const CreateOrEditModel = ({
	show,
	setShow,
	handleSubmit,
	formTabs,
	initValue,

	sponsored,
}: {
	show: boolean;
	setShow: any;
	handleSubmit: (values: any) => void;
	initValue?: any;
	formTabs: any;
	sponsored: Sponsored | undefined;
}) => {
	if (sponsored != undefined)
		return (
			<Modal size="lg" show={show}>
				<Modal.Header className="d-flex justify-content-between">
					<h5 className="modal-title" id="post-modalLabel">
						We are so glad you decided to sponsor {sponsored.firstName} {sponsored.lastName}
					</h5>
					<button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>
						<i className="ri-close-fill"></i>
					</button>
				</Modal.Header>
				<Modal.Body>
					<DynamicForm tabs={formTabs} handleSubmit={handleSubmit} initValue={initValue} />
				</Modal.Body>
			</Modal>
		);
	else return <></>;
};
export default CreateOrEditModel;
