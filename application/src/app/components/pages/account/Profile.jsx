import React from 'react';

import {Grid, Row, Col} from 'react-bootstrap';
class Profile extends React.Component {

   render() {
      return(
         <Grid>
            <Row>
               <Col xs={12}>
                  <div className="menu-card">
                     <h2>Profil</h2>
                     <h4>{this.state.name}</h4>

                     <h4>{this.state.email}</h4>
                     <br></br>
                     <h3 className="menu-btn" onClick={() => this.props.onClick()}>Ändra uppgifter</h3>
                     <h3 className="menu-btn" onClick={() => this.logout()}>Logga ut</h3>
                  </div>
               </Col>
            </Row>
         </Grid>
      );
   }
}
