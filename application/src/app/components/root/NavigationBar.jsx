import React from 'react';
import Cookies from 'js-cookie';
import {browserHistory} from 'react-router';

//Components
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
import ChangeProfileModal from './ChangeProfileModal.jsx';

import UserMenu from './UserMenu.jsx';

//Stylesheets
import '../../css/style.scss';

class NavigationBar extends React.Component {
   constructor() {
      super();
      this.state = {
         menuVisible: false,
         profileClicked: false,
         name: '',
         email: '',
      }
   }

   componentDidMount() {
      fetch('http://localhost:5000/me', {credentials: 'include'}).then((res) => {
         return res.json();
      }).then((json) => {
         if (json.user.email != undefined) {
            this.setState({
               name: json.user.name,
               email: json.user.email,
               admin: json.user.admin
            });
         }
      });
   };

   onClickChangeProfile() {
      this.setState({
         menuVisible: false
      });
      const path = `/account`;
      browserHistory.push(path);
   }

   onClickAdmin() {
      this.setState({
         menuVisible: false
      });
      var path = `/admin`;
      browserHistory.push(path);
   }

   showMenu() {
      if(this.state.profileClicked != true) {
         this.setState({
            profileClicked: true,
            menuVisible: true
         });
      }
   }

   resetProfileClicked() {
      this.setState({
         profileClicked: false
      });
   }

   hideMenu() {
      this.setState({
         menuVisible: false,
      });

      setTimeout(() => this.resetProfileClicked(), 500);
   }

   render() {
      return(
         <div>
            {
               this.state.menuVisible
               &&
               <UserMenu
                  name={this.state.name}
                  email={this.state.email}
                  admin={this.state.admin}
                  onClickAdmin={() => this.onClickAdmin()}
                  onClick={() => this.onClickChangeProfile()}
                  hide={() => this.hideMenu()} />
            }
            <Navbar fixedTop={true}>
               <Nav>
                  <LinkContainer to={"/inspiration"} className="hidden-md hidden-lg">
                     <NavItem onClick={() => localStorage.setItem('scroll', 0)}>
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
                        <i className="fa fa-plus fa-lg"/>
                     </NavItem>
                  </LinkContainer>


                  <NavItem onClick={() => this.showMenu()}
                     className={(this.state.menuVisible) ? 'hidden-md hidden-lg active' : 'hidden-md hidden-lg'}>
                     <i className="fa fa-user-circle fa-lg"/>
                  </NavItem>
               </Nav>
               <Nav className="hidden-sm hidden-xs" pullRight>
                  <LinkContainer to={"/suggestion"}>
                     <NavItem id="nav-item-tip">
                        Tipsa!
                     </NavItem>
                  </LinkContainer>

                  <NavItem id="nav-item-profile" onClick={() => this.showMenu()} >
                     <div id="icon-profile">
                        {this.state.name}
                     </div>

                     <i id="arrow-icon" className="material-icons icon icon-profile">arrow_drop_down</i>
                  </NavItem>
               </Nav>
            </Navbar>
         </div>
      );
   }
}
export default NavigationBar;
