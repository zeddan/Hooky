import React from 'react';
import {Button,ButtonToolbar,Modal} from 'react-bootstrap';
import RegisterForm from './RegisterForm.jsx';

class RegisterButton extends React.Component {

    constructor(){
        super();
        this.state = {
            show: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    };

    showModal() {
        console.log(this);
        this.setState({show: true});
    };

    hideModal() {
        this.setState({show: false});
    };

    render() {
        return (
            <ButtonToolbar>
                <Button bsStyle="primary" onClick={this.showModal}>
                    Register
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <RegisterForm/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.hideModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </ButtonToolbar>
        );
    }

}

export default RegisterButton;