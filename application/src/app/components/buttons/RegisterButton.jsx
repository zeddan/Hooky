import React from 'react';

//Components
import {Button,ButtonToolbar,Modal} from 'react-bootstrap';
import RegisterForm from '../forms/RegisterForm.jsx';

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
            <div>
                <Button bsStyle="primary" onClick={this.showModal} >
                    Registrera med Email
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Hooky - Register</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <RegisterForm/>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default RegisterButton;
