import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import EditFormSelection from "./EditFormSelection.jsx";

export class FormsSummary extends Component {
	constructor(props) {
		super(props);
		this.filterSelectedForm = this.filterSelectedForm.bind(this);
	}

	filterSelectedForm = () => {
		const selectedFormsList = this.props.selectedForms;
		const formListing = [];

		selectedFormsList.map((item) => {
			return item.children.map((elem) => {
				return formListing.push({
					value: elem.value,
					label: elem.label,
					description: elem.description,
				});
			});
		});
		return formListing;
	};

	render() {
		const selectedFormsList = this.props.selectedForms;

		return (
			<Card className="bnm-card selected-form-card">
				<Card.Body>
					<div className="d-flex justify-content-between">
						<span className="h5 text-left font-weight-bold">Selected Ingredients</span>
						<i
							className="pt-2 fas fa-lg fa-undo-alt icon-button rct-reset-btn"
							title="Reset"
							onClick={() => {
								this.props.onReset();
							}}
						></i>
					</div>
					<hr className="mt-1" />
					<div className="edit-form-selection">
						{this.props.length() === 0 ? (
							<span>No ingredient selected...</span>
						) : (
							<EditFormSelection
								nodes={selectedFormsList}
								unCheckAll={this.props.unCheckAll}
								onCheck={this.props.onCheck}
								onOpen={this.props.onOpen}
							></EditFormSelection>
						)}
					</div>
				</Card.Body>
				<hr className="m-0" />
				<Card.Footer>
					<div className="d-flex align-items-center justify-content-between">
						<span>
							<strong>Total selected: {this.props.length()}</strong>
						</span>
						<Button
							onClick={() => {
								this.props.setJsonList(this.filterSelectedForm());
								this.props.handleShow();
							}}
							disabled={selectedFormsList.length === 0 ? true : false}
						>
							Done
						</Button>
					</div>
				</Card.Footer>
			</Card>
		);
	}
}

export default FormsSummary;
