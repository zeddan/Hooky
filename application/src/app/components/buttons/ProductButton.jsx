import React from 'react';

//Components
import {Button,ButtonToolbar,Modal} from 'react-bootstrap';
import ProductForm from '../forms/ProductForm.jsx';

class ProductButton extends React.Component {

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
                <Button bsStyle="primary" onClick={this.showModal} >
                    Suggest a product
                </Button>

                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.hideModal}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">Suggest a product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                       <ProductForm/>
                    </Modal.Body>
                </Modal>
            </ButtonToolbar>
        );
    }
}

export default ProductButton;
