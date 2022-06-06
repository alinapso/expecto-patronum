import { Expenses } from "expecto-patronum-common/entities/expenses";
import { RemoteApiCall } from "lib/remoteAPI";
import Link from "next/link";
import { Component } from "react";
import { Col, Card, Button } from "react-bootstrap";
import { RowImage, getFileType } from "../DragAndDrop/common";

type ExpensesInputProps = {
	defualtValue?: Expenses[];
};
type ExpensesInputState = {
	expenses: Expenses[];
};

export class ExpensesInput extends Component<ExpensesInputProps> {
	value: Expenses[] = [];
	constructor(props: ExpensesInputProps) {
		super(props);
		if (this.props.defualtValue != undefined) {
			this.value = this.props.defualtValue;
		}
	}
	state: ExpensesInputState = {
		expenses: [],
	};
	handleDelete = async (index: number) => {
		const deletedFile = this.value[index].uploadedFileId;
		this.state.expenses.splice(index, 1);
		this.setState((state) => ({ value: [...this.state.expenses] }));

		this.value.splice(index, 1);
		const res = await RemoteApiCall({
			method: "DELETE",
			url: `/uploaded-file/${deletedFile}`,
		});
	};
	render() {
		return (
			<Col sm={12} className="mb-3">
				<Card>
					<Card.Header className="">
						<div className="input-block-level">add new expense</div>
					</Card.Header>
					<Card.Body>
						{this.state.expenses ? (
							<div>
								<table className="files-lists table table-striped ">
									<thead>
										<tr>
											<th scope="col">
												<div className=" text-center">
													<input type="checkbox" className="form-check-input" />
												</div>
											</th>
											<th scope="col">Expense Name</th>
											<th scope="col">Total</th>
											<th scope="col">Receipt</th>
										</tr>
									</thead>
									<tbody>
										{this.state.expenses.map((expense, index) => (
											<ExpensesTableRow
												exp={expense}
												key={index}
												onDelete={() => () => () => this.handleDelete(index)}
											/>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<></>
						)}
					</Card.Body>
				</Card>
			</Col>
		);
	}
}
export const ExpensesTableRow = ({ exp, onDelete }: { exp: Expenses; onDelete: () => void }) => {
	const fileNameSnip = (name: string) => {
		if (!name) return "";
		if (name.length < 20) return name;
		return name.split("", 15) + "...";
	};
	const file = exp.uploadedFile;
	const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
	return (
		<tr>
			<td>
				<div className=" text-center">
					<input type="checkbox" className="form-check-input" />
				</div>
			</td>
			<td>
				<span className="overflow-hidden">{exp.title}</span>
			</td>
			<td>
				<span className="overflow-hidden">{exp.sum}</span>
			</td>
			<td className="overflow-hidden">
				<div className="flex align-items-center list-user-action">
					<Link href={`${ENDPOINT}/${file.id}.${file.postfix}`}>
						<Button type="button" className="btn btn-labeled btn-success">
							<i className="ri-download-line"></i>
						</Button>
					</Link>
					<Button type="button" className="btn  btn-labeled btn-danger ms-2" onClick={() => onDelete()}>
						<i className="ri-delete-bin-line "></i>
					</Button>
				</div>
			</td>
		</tr>
	);
};
