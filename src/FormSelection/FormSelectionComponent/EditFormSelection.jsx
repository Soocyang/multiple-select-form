import React, { Component } from "react";

export class EditFormSelection extends Component {
	constructor(props) {
		super(props);

		this.onCheck = this.onCheck.bind(this);
	}

	onCheck(formValue) {
		this.props.onCheck({ formValue });
	}

	render() {
		const data = this.props.nodes;

		return (
			<ul className="fa-ul">
				{data.map((item) => {
					return (
						<li key={item.value}>
							<span className="fa-li">
								<i
									className={
										item.checkAll
											? `fas fa-check-square`
											: `fas fa-minus-square`
									}
									title="Remove All"
									style={{ cursor: "pointer" }}
									onClick={() => {
										this.props.unCheckAll(item.value);
									}}
								></i>
							</span>
							<div
								className="edit-select-form-grp-label d-flex flex-row "
								onClick={() => {
									this.props.onOpen(item.value);
								}}
							>
								<i className="fas fa-folder mr-2 mt-1"></i>
								<span>{item.value}. &nbsp;</span>
								<span>{item.label}</span>
							</div>
							<ul className="fa-ul ml-4">
								{item.children.map((elem) => {
									return (
										<li key={elem.value}>
											<span className="fa-li">
												<i
													className="far fa-minus-square"
													onClick={() => this.onCheck(elem.value)}
													style={{ cursor: "pointer" }}
													title="Remove"
												></i>
											</span>
											<div
												className="edit-select-form-label"
												onClick={() => {
													this.props.onOpen(item.value);
												}}
											>
												{elem.label}
											</div>
										</li>
									);
								})}
							</ul>
						</li>
					);
				})}
			</ul>
		);
	}
}

export default EditFormSelection;
