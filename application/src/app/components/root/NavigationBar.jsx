import React from 'react';

import {Link} from "react-router";

import {Navbar, NavDropdown, Nav, NavItem, MenuItem, NavLink} from 'react-bootstrap';

import './sass/NavigationBar.scss';

class NavigationBar extends React.Component {

    onItemClick() {

    }

  render() {
    return(
            <Navbar fixedTop={true} >
                <Nav>
                    <NavItem >
                        <span className="hidden-md hidden-lg">
                            <Link to={"/inspiration"} >
                                <i className="fa fa-home fa-lg icon-active icon"/>
                            </Link>
                        </span>
                        <span className="hidden-sm hidden-xs">
                            <Link id="nav-item-home" to={"/inspiration"}>Hooky</Link>
                        </span>
                    </NavItem>

                    <NavItem>
                        <span className="hidden-md hidden-lg">
                            <Link to={"#"}>
                                <i className="fa fa-plus fa-lg
                                icon"/>
                            </Link>
                        </span>
                    </NavItem>

                    <NavItem>
                        <span className="hidden-md hidden-lg">
                            <Link to={"#"} >
                                <i className="fa fa-user-circle fa-lg icon" />
                            </Link>
                        </span>
                    </NavItem>
                </Nav>
                <Nav className="hidden-sm hidden-xs" pullRight>
                    <NavItem>
                        <span >
                            <Link id="nav-item-tip" to={"#"}>
                                Tipsa!
                            </Link>
                        </span>
                    </NavItem>
                    <NavItem>
                        <span>
                            <Link id="nav-item-profile" to={"#"}>
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
