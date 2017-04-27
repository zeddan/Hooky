import React from 'react';

import {Link} from "react-router";

import {Navbar, NavDropdown, Nav, NavItem, MenuItem, NavLink} from 'react-bootstrap';

import './sass/NavigationBar.scss';
import ProductButton from '../buttons/ProductButton.jsx'
class NavigationBar extends React.Component {

  render() {
    return(
            <Navbar fixedTop={true}>
                <Nav>
                    <NavItem>
                        <span className="hidden-md hidden-lg">
                            <Link to={"/inspiration"} >
                                <i className="fa fa-home fa-lg"/>
                            </Link>
                        </span>
                        <span className="hidden-sm hidden-xs">
                            <Link id="nav-item-home" to={"/inspiration"}>Hooky</Link>
                        </span>
                    </NavItem>
		<ProductButton hidden="hidden-md hidden-lg"/>
                    <NavItem>
                        <span className="hidden-md hidden-lg">
                            <Link to={"/account"} >
                                <i className="fa fa-user-circle fa-lg" />
                            </Link>
                        </span>
                    </NavItem>
                </Nav>
                <Nav className="hidden-sm hidden-xs" pullRight>
	    	    <ProductButton hidden="hidden-sm hidden-xs"/>
                    <NavItem>
                        <span>
                            <Link id="nav-item-profile" to={"/account"}>
                                Företaget AB
                            </Link>
                        </span>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;
