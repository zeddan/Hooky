import React from 'react';

import onClickOutside from 'react-onclickoutside';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Cookies from 'js-cookie';

import '../../css/style.scss';

class UserMenu extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         name: props.name,
         email: props.email,
         admin: props.admin,
      };
   }

   changeUserInfo() {

   }

   logout() {
      fetch('http://localhost:5000/logout', {credentials: 'include'}).then((res) => {
           return res.json();
      }).then((json) => {
           Cookies.remove('name', {path: '/'});
           Cookies.remove('user_id', {path: '/'});
           window.location = '/';
      });
   }

   handleClickOutside = event => {
      this.props.hide();
   }

   render() {
      return(

         <div >
            <MuiThemeProvider >
               <Paper id="popup" tabIndex="0" >
                  <div className="menu-card">
                     <h3>Profil</h3>
                     <h4>{this.state.name}</h4>
                     <h4>{this.state.email}</h4>
                     <br></br>
                     <h3 className="menu-btn" onClick={() => this.props.onClick()}>Ändra uppgifter</h3>
                     {this.state.admin && <h3 className="menu-btn" onClick={() => this.props.onClickAdmin()}>Admin</h3>}
                     <h3 className="menu-btn" onClick={() => this.logout()}>Logga ut</h3>
                  </div>
               </Paper>
            </MuiThemeProvider>

         </div>
      )
   }
}

export default onClickOutside(UserMenu);
