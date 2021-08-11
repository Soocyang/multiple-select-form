import React, { Component } from "react";
import { Col, Card } from "react-bootstrap";

export class FormCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onCheck = this.onCheck.bind(this);
	}

	onCheck(formValue) {
		this.props.onCheck({ formValue });
	}

	render() {
		const form = this.props.form;

		return (
			<Col md={6} lg={4} className="p-0 d-flex">
				<Card
					className={`m-1 flex-fill form-select-card sub-card bnm-card`}
					onClick={() => this.onCheck(form.value)}
				>
					<Card.Body className={`${form.isCheck ? "show" : ""}`}>
						<div className="d-flex justify-content-between align-middle">
							<span className="font-weight-bold">{form.label}</span>
						</div>

						<hr className="mt-1" />
						<Card.Text>{form.description}</Card.Text>
						<i
							className={`fas fa-lg fa-check-circle form-check-icon ${
								form.isCheck ? "show" : ""
							}`}
						></i>
					</Card.Body>
				</Card>
			</Col>
		);
	}
}

export default FormCard;
