import React from 'react';
import Cookies from 'js-cookie';
import {browserHistory} from 'react-router';

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
         console.log(json.user);
         if (json.user.email != undefined) {
            this.setState({
               name: json.user.name,
               email: json.user.email,
               admin: json.user.admin
            });
         }
      });

      setTimeout(() => {
         this.setState({
            name: Cookies.get('name')
         });
      }, 100);
   };



   onClickChangeProfile() {
      this.setState({
         isVisible: false
      });
      const path = `/account`;
      browserHistory.push(path);
   }

   onExitedModal() {
      this.setState({
         showModal: false
      });
   }

   onClickAdmin() {
      this.setState({
         isVisible: false
      });
      var path = `/admin`;
      browserHistory.push(path);
   }

   showMenu() {
      this.setState({
         isVisible: true
      });
   }

   hideMenu() {
      this.setState({
         isVisible: false
      });
   }

   render() {
      return(
         <div>
            {
               this.state.isVisible
               &&
               <UserMenu
                  name={this.state.name}
                  email={this.state.email}
                  admin={this.state.admin}
                  onClickAdmin={() => this.onClickAdmin()}
                  onClick={() => this.onClickChangeProfile()}
                  hide={() => this.hideMenu()} />
            }

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


                  <NavItem className="hidden-md hidden-lg" onClick={() => this.showMenu()}>
                     <i className="fa fa-user-circle fa-lg"/>
                  </NavItem>


               </Nav>
               <Nav className="hidden-sm hidden-xs" pullRight>
                  <LinkContainer to={"/suggestion"}>
                     <NavItem id="nav-item-tip">
                        Tipsa!
                     </NavItem>
                  </LinkContainer>


                  <NavItem id="nav-item-profile" onClick={() => this.showMenu()}>
                     <div id="icon-profile">
                        {this.state.name}
                        <i className="material-icons icon icon-profile">arrow_drop_down</i>
                     </div>
                  </NavItem>

               </Nav>
            </Navbar>
            <div className="modal-container">
               {this.state.showModal && <ChangeProfileModal onExited={() => this.onExitedModal()}/>}
            </div>
         </div>
      );
   }
}

export default NavigationBar;
