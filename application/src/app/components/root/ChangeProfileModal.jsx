import React from 'react';

import {Button, ButtonToolbar, Modal} from 'react-bootstrap';
import ChangeProfileForm from '../forms/ChangeProfileForm.jsx';

class ChangeProfileModal extends React.Component {
   constructor() {
      super();
      this.state = {
         show: true
      };
   };

   showModal() {
      console.log(this);
      this.setState({show: true});
   };

   hideModal() {
      this.setState({show: false});
   };

   render() {
      return(
         <ButtonToolbar>
            <Modal
               {...this.props}
               show={this.state.show}
               onHide={() => this.hideModal()}
               onExited={() => this.props.onExited()}
               dialogClassName="custom-modal">

               <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-lg">Ändra uppgifter</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <ChangeProfileForm />
               </Modal.Body>
            </Modal>
         </ButtonToolbar>
      )
   }
}

export default ChangeProfileModal;
