import React from 'react';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../css/userMenu.scss';

class UserMenu extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         name: props.name,
         email: props.email
      };
   }

   changeUserInfo() {
      alert("change user info");
   }

   logout() {
      fetch('http://localhost:5000/logout', {credentials: 'include'}).then((res) => {
           return res.json();
      }).then((json) => {
           window.location = '/';
      });
   }

   render() {
      return(
         <MuiThemeProvider >
            <Paper id="popup">
               <div className="menu-card">
                  <h3>Profil</h3>
                  <h4>{this.state.name}</h4>
                  <h4>{this.state.email}</h4>
                  <br></br>
                  <h3 className="menu-btn" onClick={() => this.changeUserInfo()}>Ändra uppgifter</h3>
                  <h3 className="menu-btn" onClick={() => this.logout()}>Logga ut</h3>
               </div>
            </Paper>
         </MuiThemeProvider>
      )
   }
}

export default UserMenu;
