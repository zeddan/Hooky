import React from 'react';

import {Grid, Row, Col, Form, FormGroup, ControlLabel, InputGroup, FormControl, Button} from 'react-bootstrap';
import '../../../css/style.scss';
import Cookies from 'js-cookie';

import '../../../css/_account.scss';

class Account extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: 'Djäkne',
         email: 'info@djakne.se',
         about: 'Beskrivning...',
         zipcode: '',
         company: '',
         delivers_to:'',
         id: ''
      };
      this.logout = this.logout.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      })
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
               about: json.user.about,
               zipcode: json.user.zipcode,
               company: json.user.company,
               delivers_to: json.user.delivers_to,
               id: json.user.id
            });
         }
      });
   };

   render() {
      return (
         <Grid>
            <Row>
               <Col xs={12}>
                  <Form onSubmit={this.handleSubmit}>
                     <h2>Min Profil</h2>
                     <FormGroup>
                        <ControlLabel>Namn</ControlLabel>
                        <InputGroup>
                           <InputGroup.Addon><i className='fa fa-info-circle'/></InputGroup.Addon>
                           <FormControl
                              name='name'
                              type='text'
                              value={this.state.name}
                              onChange={this.handleChange}/>
                        </InputGroup>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Email</ControlLabel>
                        <InputGroup>
                           <InputGroup.Addon><i className='fa fa-info-circle'/></InputGroup.Addon>
                           <FormControl
                              name='email'
                              type='text'
                              value={this.state.email}
                              onChange={this.handleChange}/>
                        </InputGroup>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Om mig</ControlLabel>
                        <FormControl
                           name='about'
                           componentClass='textarea'
                           value={this.state.about}
                           onChange={this.handleChange}/>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Företag</ControlLabel>
                        <InputGroup>
                           <InputGroup.Addon><i className='fa fa-info-circle'/></InputGroup.Addon>
                           <FormControl
                              name='company'
                              type='text'
                              value={this.state.company}
                              onChange={this.handleChange}/>
                        </InputGroup>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Verksam i</ControlLabel>
                        <InputGroup>
                           <InputGroup.Addon><i className='fa fa-info-circle'/></InputGroup.Addon>
                           <FormControl
                              name='delivers_to'
                              type='text'
                              value={this.state.delivers_to}
                              onChange={this.handleChange}/>
                        </InputGroup>
                     </FormGroup>

                     <FormGroup>
                        <ControlLabel>Zipcode</ControlLabel>
                        <InputGroup>
                           <InputGroup.Addon><i className='fa fa-info-circle'/></InputGroup.Addon>
                           <FormControl
                              name='zipcode'
                              type='text'
                              value={this.state.zipcode}
                              onChange={this.handleChange}/>
                        </InputGroup>
                     </FormGroup>
                     <Button id='submit-btn' bsStyle='default' bsSize='large' type='submit' block>Ändra uppgifter</Button>
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

export default Account;
