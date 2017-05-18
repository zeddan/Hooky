import React from 'react';

//Components
import {Button, ButtonToolbar, Modal} from 'react-bootstrap';
import LoginForm from '../forms/LoginForm.jsx';
import LinkedInButton from '../buttons/LinkedInButton.jsx';
import RegisterForm from '../forms/RegisterForm.jsx';

class LoginButton extends React.Component {

    constructor() {
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
                <Button id="loginbuttonmove" bsStyle="link" onClick={this.showModal}>
                    <span id="loginbutton">Logga in</span>
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Logga in</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LinkedInButton/>
                        <hr/>
                        <LoginForm/>
                        <hr/>
                        <p id="noaccount">Har du inget konto? <br/>Registrera dig här</p>
                        <RegisterForm/>
                    </Modal.Body>
                </Modal>
            </ButtonToolbar>
        );
    }
}

export default LoginButton;
