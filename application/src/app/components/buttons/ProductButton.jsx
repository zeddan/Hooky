import React from 'react';
import {Link} from "react-router";
//Components
import {Modal, NavLink} from 'react-bootstrap';
import ProductForm from '../forms/ProductForm.jsx';

class ProductButton extends React.Component {

	constructor(){
		super();
		this.state = {
			show: false
		};
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	};
	showModal() {
		console.log(this);
		this.setState({show: true});
	};

	hideModal() {
		this.setState({show: false});
	};

	render() {
		return (
			<NavItem onClick={this.showModal} className={this.props.hidden}>
			<span className="hidden-md hidden-lg">
			<i className="fa fa-plus fa-lg" />
			</span>

			<span className="hidden-sm hidden-xs">
			<span id="nav-item-tip">
			Tipsa!
			</span>
			</span>
			<Modal
			{...this.props}
			show={this.state.show}
			onHide={this.hideModal}
			dialogClassName="custom-modal"
			>
			<Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-lg">Suggest a product</Modal.Title>
			</Modal.Header>
			<Modal.Body>
			<ProductForm/>
			</Modal.Body>
			</Modal>
			</NavItem>
		);
	}
}

export default ProductButton;
