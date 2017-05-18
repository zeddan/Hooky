import React from 'react';
import Cookies from 'js-cookie';

//Components
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

//Stylesheets
import './sass/NavigationBar.scss';

class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        name: Cookies.get('name')
      });
    }, 100);
  }

  render() {
    if (this.state.name == '') {
      return null;
    }
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

          <LinkContainer to={"/suggestion"} className="hidden-md hidden-lg">
            <NavItem>
              <i className="fa fa-plus fa-lg" />
            </NavItem>
          </LinkContainer>

          <LinkContainer to={"/account"} className="hidden-md hidden-lg">
            <NavItem>
              <i className="fa fa-user-circle fa-lg"/>
            </NavItem>
          </LinkContainer>

        </Nav>
        <Nav className="hidden-sm hidden-xs" pullRight>
          <LinkContainer to={"/suggestion"}>
            <NavItem id="nav-item-tip">
              Tipsa!
            </NavItem>
          </LinkContainer>

          <LinkContainer to={"/account"}>
            <NavItem id="nav-item-profile">
              {this.state.name}
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>
    );
  }
}

export default NavigationBar;
