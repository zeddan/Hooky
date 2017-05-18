import React from 'react';

//Components
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

import UserMenu from './UserMenu.jsx';

//Stylesheets
import './sass/NavigationBar.scss';

class NavigationBar extends React.Component {
  render() {
    return(
      <div>
         <UserMenu />
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
                 Företaget
               </NavItem>
             </LinkContainer>
           </Nav>
         </Navbar>
      </div>
    );
  }
}

export default NavigationBar;
