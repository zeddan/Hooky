import React from 'react';

import {Link} from "react-router";

import {Navbar, NavDropdown, Nav, NavItem, MenuItem} from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

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
                    <NavItem className="hidden-md hidden-lg" onClick={() => this.setActive(0)}>
                        <Link to={"/inspiration"} className={this.isActive(0)} >
                            <i className="fa fa-home fa-lg"/>
                        </Link>
                    </NavItem>

                    <NavItem className="hidden-sm hidden-xs" onClick={() => this.setActive(0)}>
                        <Link id="nav-item-home" to={"/inspiration"}  className={this.isActive(1)}>
                                Hooky
                        </Link>
                    </NavItem>

                    <NavItem className="hidden-md hidden-lg" onClick={() => this.setActive(1)}>
                        <Link to={"#"} className={this.isActive(1)}>
                            <i className="fa fa-plus fa-lg"/>
                        </Link>
                    </NavItem>

                    <NavItem className="hidden-md hidden-lg" onClick={() => this.setActive(2)}>
                        <Link to={"#"} className={this.isActive(2)}>
                            <i className="fa fa-user-circle fa-lg"/>
                        </Link>
                    </NavItem>
                </Nav>
                <Nav className="hidden-sm hidden-xs" pullRight>
                    <NavItem>
                        <Link id="nav-item-tip" to={"#"} >
                            Tipsa!
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link id="nav-item-profile" to={"#"} >
                            Företaget AB
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;
