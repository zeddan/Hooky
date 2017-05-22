import React from 'react';

import {
    Modal,
    Header,
    Body,
    Button
} from 'react-bootstrap';

class Popup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
              <Modal
                  onHide={this.props.close}
                  show={this.props.show}
                  dialogClassName="popup">
                  <Modal.Body>
                    <p>{this.props.message}</p>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button onClick={this.props.close}>OK</Button>
                  </Modal.Footer>
              </Modal>
          </div>
        );
    }
}

export default Popup;
