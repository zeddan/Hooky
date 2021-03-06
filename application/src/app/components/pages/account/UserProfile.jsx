import React from 'react';

import {Grid, Row, HelpBlock, Col, Form, FormGroup, ControlLabel, InputGroup, FormControl, Button} from 'react-bootstrap';
import '../../../css/style.scss';
import Cookies from 'js-cookie';
import Popup from '../../Popup.jsx';

import '../../../css/_account.scss';

class Account extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: '',
         email: 'info@djakne.se',
	 about: '',
	 zipcode: '12345',
	 company: 'Ditt företag',
	 delivers_to:'Vilket område är du verksam i',
	 id: '',
	 linkedin: true,
	 showPopup: false
      };
      this.logout = this.logout.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.openPopup = this.openPopup.bind(this);
   };

   handleChange(event) {
      this.setState({
         [event.target.name]: event.target.value,
      });
   }

   handleSubmit(event) {
            event.preventDefault();
                fetch('http://localhost:5000/users/' + this.state.id + '/', {
                    method: 'PUT',
		    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        email: this.state.email,
                        about: this.state.about,
                        zipcode: this.state.zipcode,
                        company: this.state.company,
                        delivers_to: this.state.delivers_to,
                    })
                }).then((response) => {
			this.openPopup();
		});
    }

   openPopup() {
        this.setState({showPopup: true});
    }

    closePopup() {
        this.setState({showPopup: false});
    }

   componentDidMount() {
      fetch('http://localhost:5000/users/'+this.props.routeParams.userID+'/').then((res) => {
         return res.json();
      }).then((json) => {
         console.log(json.user);
         if (json.user.email != undefined) {
            this.setState({
		    name: json.user.name,
		    email: json.user.email,
		    about: (json.user.about != null) ? json.user.about : '',
		    zipcode: (json.user.zipcode != null) ? json.user.zipcode : '',
		    company: (json.user.company != null) ? json.user.company : '',
		    delivers_to: (json.user.delivers_to != null) ? json.user.delivers_to : '',
		    id: json.user.id,
		    linkedin: (json.user.social_id == null) ? true : false
	    });
	 }
	 });
   }


   render() {
      return (
	<div>
              <Popup show={this.state.showPopup}
                     close={e => this.closePopup(e)}
                     message="Uppgifterna ändrade"
                     />
         <Grid>
            <Row>
               <Col xs={12}>
	      	  <Form onSubmit={this.handleSubmit}>
		  <h2>{this.state.name}</h2>

			
	      			<p>{this.state.email}</p>

                     <FormGroup>
                        <ControlLabel>Presentation</ControlLabel>
			<p>{this.state.about}</p>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Företag</ControlLabel>
			<p>{this.state.company}</p>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Verksam i</ControlLabel>
			<p>{this.state.delivers_to}</p>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Postnummer</ControlLabel>
			<p>{this.state.zipcode}</p>
                     </FormGroup>
                  </Form>
               </Col>
            </Row>
         </Grid>
	</div>
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

export default Account;
