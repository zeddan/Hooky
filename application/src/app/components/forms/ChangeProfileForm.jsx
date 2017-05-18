import React from 'react';
import {
   Button,
   Form,
   FormGroup,
   Col,
   Checkbox,
   ControlLabel,
   FormControl,
   HelpBlock
} from 'react-bootstrap';

class ChangeProfileForm extends React.Component {
   constructor() {
      super();
      this.state = {
         name: '',
         email: ''
      }
   }

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

   handleSubmit() {

   }

   handleChange() {

   }

   render(){
      var show = false;
      return(
         <Form horizontal onSubmit={() => this.handleSubmit()}>
            <FormGroup controlId="">
               <Col componentClass={ControlLabel} sm={2}>
                  Name
               </Col>
               <Col sm={10}>
                  <FormControl
                     name='email'
                     type="email"
                     placeholder="Name"
                     value={this.state.name}
                     onChange={() => this.handleChange()}/>
               </Col>
            </FormGroup>

            { true &&
               <span>
                  <FormGroup controlId="">
                     <Col componentClass={ControlLabel} sm={2}>
                        Email
                     </Col>
                     <Col sm={10}>
                        <FormControl
                           name='email'
                           type="email"
                           placeholder="Email"
                           value={this.state.email}
                           onChange={() => this.handleChange()}/>
                     </Col>
                  </FormGroup>

                  <FormGroup controlId="">
                     <Col componentClass={ControlLabel} sm={2}>
                        Lösenord
                     </Col>
                     <Col sm={10}>
                        <FormControl name='email' type="password"
                           onChange={() => this.handleChange()}/>
                     </Col>
                  </FormGroup>

                  <FormGroup controlId="">
                     <Col componentClass={ControlLabel} sm={2}>
                        Lösenord
                     </Col>
                     <Col sm={10}>
                        <FormControl name='email' type="password"
                           onChange={() => this.handleChange()}/>
                     </Col>
                  </FormGroup></span>
            }
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Button type="submit">
                        Logga in
                    </Button>
                </Col>
            </FormGroup>
         </Form>
      )
   }
}

export default ChangeProfileForm;
