import React from 'react';

import {Link} from "react-router";

import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from 'react-bootstrap';

import {LinkContainer} from "react-router-bootstrap";

import './sass/NavigationBar.scss';
import ProductButton from '../buttons/ProductButton.jsx'
class NavigationBar extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: 0
        };
    }

    setActive(value) {
        this.setState({
            selected: value
        });
    }

    isActive(value) {
        return ((value === this.state.selected) ? 'icon-active' : 'icon-noactive');
    }

    render() {
    return(
            <Navbar fixedTop={true} >
                <Nav>
                  <LinkContainer to={"/inspiration"} className="hidden-md hidden-lg">
                    <NavItem>
                      <i className="fa fa-home fa-lg"/>
                    </NavItem>
                  </LinkContainer>

                  <LinkContainer to={"/inspiration"} className="hidden-sm hidden-xs">
                    <NavItem id="nav-item-home">
                      Hooky
                    </NavItem>
                  </LinkContainer>
		  <span className="hidden-md hidden-lg">
		  <ProductButton/>
	          </span>
                  <LinkContainer to={"/#"} className="hidden-md hidden-lg">
                    <NavItem>
                      <i className="fa fa-user-circle fa-lg"/>
                    </NavItem>
                  </LinkContainer>

                </Nav>
                <Nav className="hidden-sm hidden-xs" pullRight>
		  <ProductButton/>
                  <LinkContainer to={"/#"}>
                    <NavItem id="nav-item-profile">
                        Företaget
                    </NavItem>
                  </LinkContainer>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;
