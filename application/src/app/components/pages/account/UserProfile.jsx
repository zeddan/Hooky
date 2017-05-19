import React from 'react';

import {Grid, Row, Col, Form, FormGroup} from 'react-bootstrap';
import Cookies from 'js-cookie';

//import '../../../css/account.scss';

class UserProfile extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: 'Djäkne',
         email: 'info@djakne.se',
	 company: 'Okänt'
      };
      this.logout = this.logout.bind(this);
   };

   componentDidMount() {
      fetch('http://localhost:5000/users/'+this.props.routeParams.userID, {credentials: 'include'}).then((res) => {
         return res.json();
      }).then((json) => {
         console.log(json.user);
         if (json.user.email != undefined) {
            this.setState({
		name: json.user.name, 
		email: json.user.email, 
		company: json.user.company,
	    	delivers_to: json.user.delivers_to
	    });
         }
      });
   };

   render() {
      return (
         <Grid>
            <Row>
               <Col xs={12}>
                  <Form>
                     <h2>{this.state.name}</h2>

                     <div className="profile-item">
                        <h3>Email</h3>
                        <h4>{this.state.email}</h4>
                     </div>

		     <div className="profile-item">
                        <h3>Företag</h3>
                        <h4>{this.state.company}</h4>
                     </div>

	      	     <div className="profile-item">
	                <h3>Verksam i</h3>
	                <h4>{this.state.delivers_to}</h4>
	             </div>

                  </Form>

               </Col>
            </Row>
         </Grid>
      )
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
}

export default UserProfile;
