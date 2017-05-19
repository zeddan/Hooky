import React from 'react';

import {
   Grid, Row, Col,
   Form, FormGroup, FieldGroup, FormControl, ControlLabel, InputGroup,
   Button
} from 'react-bootstrap';
import '../../../css/style.scss';
import Cookies from 'js-cookie';

import '../../../css/_account.scss';

class Account extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: 'Djäkne',
         email: 'info@djakne.se',
         shouldEdit: false
      };
      this.logout = this.logout.bind(this);
      this.handleChange = this.handleChange.bind(this);
   };

   componentDidMount() {
      fetch('http://localhost:5000/me', {credentials: 'include'}).then((res) => {
         return res.json();
      }).then((json) => {
         console.log(json.user);
         if (json.user.email != undefined) {
            this.setState({name: json.user.name, email: json.user.email});
         }
      });
   };

   handleChange(event) {

   }

   edit() {
      this.setState({
         shouldEdit: !this.state.shouldEdit
      });
   }

   render() {
      var editBtnText = (this.state.shouldEdit) ? 'Spara' : 'Redigera';
      return (
         <Grid>
            <Row>
               <Col xs={12}>
                  <Form>

                     <h2>Min Profil</h2>

                     <div className="profile-item">
                        <h3>Namn</h3>
                        {
                           this.state.shouldEdit
                           &&
                           <FormGroup>
                              <InputGroup>
                                 <FormControl
                                    name='name'
                                    type='text'
                                    value={this.state.name}
                                    onChange={this.handleChange}>

                                 </FormControl>
                              </InputGroup>
                           </FormGroup>
                        }
                        {
                           !this.state.shouldEdit
                           &&

                           <div className="horizontal-container">
                              <h4>{this.state.name}</h4>
                              <h6>REDIGERA</h6>
                           </div>
                        }
                     </div>

                     <div className="profile-item">
                        <h3>Beskrivning</h3>
                        {
                           this.state.shouldEdit
                           &&
                           <FormGroup>
                              <FormControl
                                  name='description'
                                  componentClass='textarea'
                                  placeholder='Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.'
                                  onChange={this.handleChange}/>
                           </FormGroup>
                        }
                        {!this.state.shouldEdit && <h4>Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</h4>}
                     </div>

                     <div className="profile-item">
                        <h3>Email</h3>
                        {
                           this.state.shouldEdit
                           &&
                           <FormGroup>
                              <InputGroup>
                                 <FormControl
                                    name='name'
                                    type='text'
                                    value={this.state.email}
                                    onChange={this.handleChange}>

                                 </FormControl>
                              </InputGroup>
                           </FormGroup>
                        }
                        {!this.state.shouldEdit && <h4>{this.state.email}</h4>}
                     </div>

                     <div className="profile-item">
                        <h3>Adress</h3>
                        {
                           this.state.shouldEdit
                           &&
                           <FormGroup>
                              <InputGroup>
                                 <FormControl
                                    name='name'
                                    type='text'
                                    value="Deliver to..."
                                    onChange={this.handleChange}>

                                 </FormControl>
                              </InputGroup>
                           </FormGroup>
                        }
                        {!this.state.shouldEdit && <h4>Deliver to...</h4>}
                     </div>

                     <br></br>
                     <Button bsStyle='default' onClick={() => this.edit()}>{editBtnText}</Button>
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
