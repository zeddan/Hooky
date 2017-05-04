import React from 'react';
import {Link} from "react-router";
//Components
import {Button,ButtonToolbar,Modal,Navbar, NavDropdown, Nav, NavItem, MenuItem, NavLink} from 'react-bootstrap';
import ProductForm from '../../forms/ProductForm.jsx';

class Tips extends React.Component {
	render() {
                return (
			<div>
			<ProductForm/>
			</div>
                );
}
}

export default Tips;
