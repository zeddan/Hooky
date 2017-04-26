import React from 'react';

import {Link} from "react-router";

import {Navbar, NavDropdown, Nav, NavItem, MenuItem, NavLink} from 'react-bootstrap';

import './sass/NavigationBar.scss';

class NavigationBar extends React.Component {

  render() {
    return(
            <Navbar fixedTop={true}>
                <Nav>
                    <NavItem className="icon">
                        <span className="hidden-md">
                            <Link to={"/inspiration"} >
                                <i className="fa fa-home fa-lg"/>
                            </Link>
                        </span>
                        <span className="hidden-sm hidden-xs">
                            <Link to={"/inspiration"}>Hooky</Link>
                        </span>
                    </NavItem>

                    <NavItem className="icon">
                        <span className="hidden-md">
                            <Link to={"#"}>
                                <i className="fa fa-plus fa-lg" />
                            </Link>
                        </span>
                        <span className="hidden-sm hidden-xs">
                            <Link to={"#"}>Tipsa!</Link>
                        </span>
                    </NavItem>

                    <NavItem className="icon">
                        <span className="hidden-md">
                            <Link to={"/user/10"} >
                                <i className="fa fa-user-circle fa-lg" />
                            </Link>
                        </span>
                        <span className="hidden-sm hidden-xs">
                            <Link to={"#"} >Företaget AB</Link>
                        </span>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;
