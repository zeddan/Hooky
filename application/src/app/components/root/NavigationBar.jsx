import React from 'react';
import Cookies from 'js-cookie';

//Components
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import ChangeProfileModal from './ChangeProfileModal.jsx';

import UserMenu from './UserMenu.jsx';

//Stylesheets
import './sass/NavigationBar.scss';

class NavigationBar extends React.Component {

   constructor() {
      super();
      this.state = {
         isVisible: false,
         name: 'Djäkne',
         email: 'info@djakne.se',
         showModal: false
      }
   }

   componentDidMount() {
      fetch('http://localhost:5000/me', {credentials: 'include'}).then((res) => {
         return res.json();
      }).then((json) => {
         if (json.user.email != undefined) {
            this.setState({name: json.user.name, email: json.user.email});
         }
      });

	setTimeout(() => {
      this.setState({
        name: Cookies.get('name')
      });
    }, 100);
   };

   toggleMenu() {
      this.setState({
         isVisible: !this.state.isVisible
      });
   }

   handleClick() {
      this.setState({
         isVisible: false,
         showModal: true
      });
   }


   render() {
if (this.state.name == '') {
      return null;
    }      return(
         <div>
            {this.state.isVisible && <UserMenu name={this.state.name} email={this.state.email} onClick={() => this.handleClick()}/>}
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


                  <NavItem className="hidden-md hidden-lg" onClick={() => this.toggleMenu()}>
                     <i className="fa fa-user-circle fa-lg"/>
                  </NavItem>


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
 {/*
            <div className="modal-container">
               {this.state.showModal && <ChangeProfileModal />}
            </div>
            */}    );
  }
}

export default NavigationBar;
