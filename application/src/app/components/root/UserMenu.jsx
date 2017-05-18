import React from 'react';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import '../../css/userMenu.scss';

class UserMenu extends React.Component {
   render() {
      return(
         <MuiThemeProvider >
            <Paper id="popup">
               <div className="menu-card">
                  <h3>Profil</h3>
                  <h4>Företaget AB</h4>
                  <h4>oladahl.lel@gmail.com</h4>
                  <br></br>
                  <h3>Ändra uppgifter</h3>
                  <h3>Logga ut</h3>
               </div>
            </Paper>
         </MuiThemeProvider>
      )
   }
}

export default UserMenu;
