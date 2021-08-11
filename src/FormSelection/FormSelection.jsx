import React, { Component } from "react";
import FormsListing from "./FormSelectionComponent/FormsListing.jsx";
import FormsSummary from "./FormSelectionComponent/FormsSummary.jsx";
import JSONViewModal from "./FormSelectionComponent/JSONViewModal.jsx";

import "../../src/styles/formSelection.css";
// import FormDescription from "./FormSelectionComponent/FormDescription.jsx";
import { Row, Col } from "react-bootstrap";

import formListingData from "./formsListing.json";

export class FormSelection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			formListing: [],
			selectedForms: [],
			expanded: [],
			activeKey: "",
			showModal: false,
			jsonListing: [],
		};
		this.setCheckAll = this.setCheckAll.bind(this);
		this.onCheck = this.onCheck.bind(this);
		this.onOpen = this.onOpen.bind(this);
		this.onClick = this.onClick.bind(this);
		this.onExpand = this.onExpand.bind(this);
		this.onReset = this.onReset.bind(this);
		this.handleCheckbox = this.handleCheckbox.bind(this);
		this.getFormsListLength = this.getFormsListLength.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.setJsonList = this.setJsonList.bind(this);
	}

	setCheckAll = (formCategory) => {
		//copy the state array to a temp array
		let formsList = [...this.state.formListing];

		//Upadate form isCheck
		const updatedFormList = formsList.map((elem) => {
			if (elem.value === formCategory) {
				if (!elem.checkAll) {
					elem.children.map((item) => {
						item.isCheck = true;
						return item;
					});
					elem.checkAll = true;
				} else {
					elem.children.map((item) => {
						item.isCheck = false;
						return item;
					});
					elem.checkAll = false;
				}
			}
			return elem;
		});

		this.setState({ formListing: updatedFormList });

		// Pass formListing to form summary component
		this.handleCheckbox(this.state.formListing);
	};

	unCheckAll = (formCategory) => {
		//copy the state array to a temp array
		let formsList = [...this.state.formListing];

		//Upadate form isCheck
		const updatedFormList = formsList.map((elem) => {
			if (elem.value === formCategory) {
				elem.children.map((item) => {
					item.isCheck = false;
					return item;
				});
				elem.checkAll = false;
			}
			return elem;
		});

		this.setState({ formListing: updatedFormList });

		// Pass formListing to form summary component
		this.handleCheckbox(this.state.formListing);
	};

	onCheck = (checked) => {
		// checkall counter
		let formCategory = "";
		let checkAllCount = 0;
		//copy the state array to a temp array
		let formsList = [...this.state.formListing];

		//Upadate form isCheck
		const updateCheck = formsList.map((elem) => {
			elem.children.map((item) => {
				if (item.value === checked.formValue) {
					formCategory = elem.value;
					if (item.isCheck) return (item.isCheck = false);
					else return (item.isCheck = true);
				}
				return item;
			});
			return elem;
		});

		//update check all

		const updatedFormList = updateCheck.map((elem) => {
			if (elem.value === formCategory) {
				elem.children.map((item) => {
					if (item.isCheck) checkAllCount++;

					return item;
				});

				if (checkAllCount === elem.children.length) {
					elem.checkAll = true;
				} else {
					elem.checkAll = false;
				}
			}
			return elem;
		});

		this.setState({ formListing: updatedFormList });

		// Pass formListing to form summary component
		this.handleCheckbox(this.state.formListing);
	};

	onOpen = (formValue) => {
		//copy the state array to a temp array
		let formsList = [...this.state.formListing];

		//iterate each item in the form group ==> (If) the form value match update isOpen to true (Else) false/reset it
		const updatedFormList = formsList.map((elem) => {
			if (elem.value === formValue) {
				if (elem.isOpen === true) {
					elem.isOpen = false;
					this.setState({ activeKey: "" });
				} else {
					elem.isOpen = true;
					this.setState({ activeKey: elem.value });
				}
			} else elem.isOpen = false;
			return elem;
		});

		this.setState({ formListing: updatedFormList });
	};

	onClick = (formValue) => {
		//copy the state array to a temp array
		let formsList = [...this.state.formListing];

		//iterate each item in the form group ==> (If) the form value match update isOpen to true (Else) false/reset it
		const updatedFormList = formsList.map((elem) => {
			if (elem.value === formValue) {
				elem.isOpen = true;
				this.setState({ activeKey: elem.value });
			} else elem.isOpen = false;
			return elem;
		});

		this.setState({ formListing: updatedFormList });
	};

	onExpand = (expanded) => {
		this.setState({ expanded });
	};

	onReset = () => {
		//copy the state array to a temp array
		let formsList = [...this.state.formListing];

		//Upadate form isCheck
		const updatedFormList = formsList.map((elem) => {
			elem.checkAll = false;
			elem.children.map((item) => {
				return (item.isCheck = false);
			});
			return elem;
		});

		this.setState({ formListing: updatedFormList });

		// Pass formListing to form summary component
		this.handleCheckbox(this.state.formListing);
	};

	handleCheckbox = (checkedForms) => {
		// Filter selected forms
		const filteredFormList = checkedForms
			.filter((item) => item.children.some((childElem) => childElem.isCheck === true))
			.map((item) => {
				return {
					...item,
					children: item.children.filter((childItem) => childItem.isCheck === true),
				};
			});

		// Hide all checkbox props for the checkbox tree
		const checkboxList = filteredFormList.map((item) => {
			return {
				...item,
				showCheckbox: false,
				children: item.children.map((elem) => ({
					...elem,
					showCheckbox: false,
				})),
			};
		});

		//set and extract form group to show expand when child selected
		const formGrpValue = filteredFormList.map((item) => item.value);

		// Set all state
		this.setState({ selectedForms: checkboxList });
		this.setState({ expanded: formGrpValue });
	};

	getFormsListLength = () => {
		const tempFormsList = this.state.selectedForms;

		const count = tempFormsList.reduce((counter, item) => {
			counter += item.children.length;
			return counter;
		}, 0);

		return count;
	};

	handleClose = () => this.setState({ showModal: false, jsonListing: [] });

	handleShow = () => this.setState({ showModal: true });

	setJsonList = (data) => this.setState({ jsonListing: data });

	componentDidMount() {
		//Init selection card open state and form check state to the orig form listing

		const formList = formListingData.map((item) => ({
			...item,
			isOpen: false,
			checkAll: false,
			children: item.children.map((elem) => ({
				...elem,
				isCheck: false,
			})),
		}));

		this.setState({ formListing: formList });
	}

	render() {
		const { formListing, selectedForms, expanded, activeKey, showModal, jsonListing } =
			this.state;

		return (
			<div className="form-selection">
				<Row>
					<Col lg={8} className="pr-0">
						<FormsListing
							activeKey={activeKey}
							setCheckAll={this.setCheckAll}
							onCheckbox={this.handleCheckbox}
							onOpen={this.onOpen}
							onCheck={this.onCheck}
							formListing={formListing}
							showModal={showModal}
							handleShow={this.handleShow}
							setJsonList={this.setJsonList}
						></FormsListing>
					</Col>
					<Col lg={4}>
						<FormsSummary
							selectedForms={selectedForms}
							length={this.getFormsListLength}
							expanded={expanded}
							unCheckAll={this.unCheckAll}
							onCheck={this.onCheck}
							onOpen={this.onClick}
							onExpand={this.onExpand}
							onReset={this.onReset}
							showModal={showModal}
							handleShow={this.handleShow}
							setJsonList={this.setJsonList}
						></FormsSummary>
					</Col>
				</Row>
				<JSONViewModal
					jsonListing={jsonListing}
					show={showModal}
					handleClose={this.handleClose}
				/>
			</div>
		);
	}
}

export default FormSelection;
