import React, { Component } from "react";
import { Row, Col, Card, Accordion, Form, Button } from "react-bootstrap";
import FormCard from "./FormCard.jsx";

export class FormsListing extends Component {
	render() {
		const formListing = this.props.formListing;

		return (
			<Card className="bnm-card form-listing-card">
				<Card.Body>
					<div className="d-flex justify-content-between">
						<span className="h5 text-left font-weight-bold">Ingredients</span>
					</div>
					<hr className="mt-1" />
					<Row className="mx-2 p-1 form-list-accordion">
						<Accordion activeKey={this.props.activeKey} className="w-100">
							{formListing.map((item, index) => {
								//Update form group class
								let formGrpClass = "align-middle form-grp-header";
								formGrpClass += item.isOpen ? " form-grp-header-clicked" : "";

								return (
									<Card key={index} className="bnm-card sub-card">
										<Accordion.Toggle
											as={Card.Header}
											eventKey={item.value}
											onClick={() => {
												this.props.onOpen(item.value);
											}}
											className={formGrpClass}
										>
											<Row>
												<Col md={1} className="pr-0">
													<span>{item.value}.</span>
												</Col>
												<Col md={10} className="pl-0">
													<span className="font-weight-bold">
														{item.label}
													</span>
												</Col>
												<Col md={1}>
													{item.isOpen ? (
														<i className="fas fa-lg fa-folder-open"></i>
													) : (
														<i className="fas fa-lg fa-folder"></i>
													)}
												</Col>
											</Row>
										</Accordion.Toggle>
										<Accordion.Collapse eventKey={item.value}>
											<Card.Body className="form-grp-sub-card">
												<Row>
													<Form className="pl-3">
														<Form.Check
															className="m-0"
															type="switch"
															id={item.value}
															label={
																item.checkAll
																	? "Deselect all"
																	: "Select all"
															}
															checked={item.checkAll ? true : false}
															onChange={() => {
																this.props.setCheckAll(item.value);
															}}
														/>
													</Form>
												</Row>
												<Row className="p-2">
													{item.children.map((subitem) => {
														return (
															<FormCard
																key={subitem.value}
																form={subitem}
																onCheck={this.props.onCheck}
															></FormCard>
														);
													})}
												</Row>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								);
							})}
						</Accordion>
					</Row>
				</Card.Body>
				<hr className="m-0" />
				<Card.Footer>
					<div className="d-flex align-items-center justify-content-between">
						<span>
							<Button
								onClick={() => {
									this.props.setJsonList(formListing);
									this.props.handleShow();
								}}
							>
								Show JSON
							</Button>
						</span>
					</div>
				</Card.Footer>
			</Card>
		);
	}
}

export default FormsListing;
