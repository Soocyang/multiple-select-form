import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function JSONViewModal(props) {

	return (
		<>
			<Modal size="lg" show={props.show} onHide={props.handleClose} animation={false}>
				<Modal.Header closeButton>
					<Modal.Title>JSON View</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ height: "70vh", overflow: "auto" }}>
					<pre className="bg-light">{JSON.stringify(props.jsonListing, null, 2)}</pre>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="primary" onClick={props.handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
