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
                        <Link to={"/inspiration"} className="hidden-md hidden-lg">
                            <i className="fa fa-home fa-lg icon-noactive"/>
                        </Link>

                        <Link id="nav-item-home" to={"/inspiration"} className="hidden-sm hidden-xs">
                            Hooky
                        </Link>

                    </NavItem>

                    <NavItem>
                        <Link to={"#"} className="hidden-md hidden-lg">
                            <i className="fa fa-plus fa-lg icon-noactive"/>
                        </Link>
                    </NavItem>

                    <NavItem>
                        <Link to={"#"} className="hidden-md hidden-lg">
                            <i className="fa fa-user-circle fa-lg icon-noactive"/>
                        </Link>
                    </NavItem>
                </Nav>
                <Nav className="hidden-sm hidden-xs" pullRight>
                    <NavItem>
                        <Link id="nav-item-tip" to={"#"}>
                            Tipsa!
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link id="nav-item-profile" to={"#"}>
                            Företaget AB
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;
