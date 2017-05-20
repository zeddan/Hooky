import React from 'react';

//Components
import {
    Grid, Col, Row,
    Form, FormGroup, FieldGroup, FormControl, ControlLabel, InputGroup,
    Image, Thumbnail, Button, Panel
}from'react-bootstrap';
import ProductForm from '../../forms/ProductForm.jsx';
import Popup from '../../Popup.jsx';

//Stylesheets
import "../../../css/style.scss";

class Suggestion extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            supplier: '',
            webpage: '',
            phone: '',
            email: '',
            address: '',
            file: '',
            supplier_description: '',
            imageURL: 'https://itavo.nl/img/placeholder.jpg',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.openPopup = this.openPopup.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {

            this.setState({
                file: file,
                imageURL: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    openPopup() {
        this.setState({showPopup: true});
    }

    closePopup() {
        this.setState({showPopup: false});
        setTimeout(() => {
            window.location.replace('http://localhost:8080/inspiration');
        }, 500);
    }

    handleSubmit(e) {
        e.preventDefault();
        const openPopup = this.openPopup;
        var data = new FormData()
        data.append('file', this.state.file)
        data.append('name', this.state.name)
        data.append('description', this.state.description)
        data.append('supplier', this.state.supplier)
        data.append('webpage', this.state.webpage)
        data.append('phone', this.state.phone)
        data.append('address', this.state.address)
        data.append('email', this.state.email)
        data.append('supplier_description', this.state.supplier_description)
        fetch('http://localhost:5000/products/', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'no-cors',
            body: data
        }).then(function (res) {
            openPopup();
        });
    }

    render() {
        return (

            <div>
              <Popup show={this.state.showPopup} 
                     close={e => this.closePopup(e)}
                     message="Varan är nu tillagd och inväntar att bli publicerad av en administratör"
                     />

                  <Grid id="content-container" className="show-grid">
                      <Row>
                          <Col lg={12} className="horizontal-container">
                              <h3 onClick={e => this.openPopup(e)} className="page-title">Tipsa om en produkt</h3>
                          </Col>
                      </Row>
                      <Form onSubmit={e => this.handleSubmit(e)}>
                          <Row>
                              <Col lg={5} md={4} sm={6} xs={12} id="left-col">
                                  <div className="items-container">
                                      <div className="image-container">
                                          <div className="visible-xs">
                                              <Image id="product-image" src={this.state.imageURL}/>
                                              <div className="text-container">
                                                  <h3>Produktbild</h3>
                                                  <p>Lägg till en bild på produkten som fångar intresse.</p>

                                                  <input type="file" name="file" id="file" className="inputfile"
                                                        onChange={(e) => this._handleImageChange(e)}/>
                                                  <label htmlFor="file" className="btn btn-default">Lägg till bild</label>
                                              </div>
                                          </div>

                                          <Thumbnail src={this.state.imageURL} className="hidden-xs">
                                              <h3>Produktbild</h3>
                                              <p>Lägg till en bild på produkten som fångar intresse.</p>

                                              <input type="file" name="file" id="file" className="inputfile"
                                                    onChange={(e) => this._handleImageChange(e)}/>
                                              <label htmlFor="file" className="btn btn-default">Lägg till bild</label>
                                          </Thumbnail>
                                      </div>
                                  </div>
                              </Col>

                              <Col lg={7} md={7} sm={6} xs={12} id="right-col">
                                  <h3>Produkt</h3>

                                  <FormGroup>
                                      <ControlLabel>Namn på produkt</ControlLabel>
                                      <InputGroup>
                                          <InputGroup.Addon><i className='fa fa-info-circle'/></InputGroup.Addon>
                                          <FormControl
                                              name='name'
                                              type='text'
                                              placeholder='Produktnamn'
                                              onChange={this.handleChange}/>
                                      </InputGroup>
                                  </FormGroup>

                                  <FormGroup>
                                      <ControlLabel>Beskrivning av produkt</ControlLabel>
                                      <FormControl
                                          name='description'
                                          componentClass='textarea'
                                          placeholder='Beskrivning...'
                                          onChange={this.handleChange}/>
                                  </FormGroup>

                                  <h3>Leverantör</h3>

                                  <FormGroup>
                                      <ControlLabel>Namn</ControlLabel>
                                      <InputGroup>
                                          <InputGroup.Addon><i className='fa fa-truck'/></InputGroup.Addon>
                                          <FormControl
                                              name='supplier'
                                              type='text'
                                              placeholder='Leverantörens namn'
                                              onChange={this.handleChange}/>
                                      </InputGroup>
                                  </FormGroup>

                                  <FormGroup>
                                      <ControlLabel>Beskrivning av leverantör</ControlLabel>
                                      <FormControl
                                          name='supplier_description'
                                          componentClass='textarea'
                                          placeholder='Beskrivning...'
                                          onChange={this.handleChange}/>
                                  </FormGroup>

                                  <FormGroup>
                                      <ControlLabel>Hemsida</ControlLabel>
                                      <InputGroup>
                                          <InputGroup.Addon><i className='fa fa-globe'/></InputGroup.Addon>
                                          <FormControl
                                              name='webpage'
                                              type='text'
                                              placeholder='Hemsida'
                                              onChange={this.handleChange}/>
                                      </InputGroup>
                                  </FormGroup>

                                  <FormGroup>
                                      <ControlLabel>Telefonnummer</ControlLabel>
                                      <InputGroup>
                                          <InputGroup.Addon><i className='fa fa-phone'/></InputGroup.Addon>
                                          <FormControl
                                              name='phone'
                                              type='text'
                                              placeholder='Nummer'
                                              onChange={this.handleChange}/>
                                      </InputGroup>
                                  </FormGroup>

                                  <FormGroup>
                                      <ControlLabel>Email</ControlLabel>
                                      <InputGroup>
                                          <InputGroup.Addon><i className='fa fa-envelope'/></InputGroup.Addon>
                                          <FormControl
                                              name='email'
                                              type='text'
                                              placeholder='Email'
                                              onChange={this.handleChange}/>
                                      </InputGroup>
                                  </FormGroup>

                                  <FormGroup>
                                      <ControlLabel>Adress</ControlLabel>
                                      <InputGroup>
                                          <InputGroup.Addon><i className='fa fa-address-card'/></InputGroup.Addon>
                                          <FormControl
                                              name='address'
                                              type='text'
                                              placeholder='Adress'
                                              onChange={this.handleChange}/>
                                      </InputGroup>
                                  </FormGroup>

                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <Button id='submit-btn' bsStyle='default' bsSize='large' type='submit' block>Lägg till
                                      produkt</Button>
                              </Col>
                          </Row>
                      </Form>
                  </Grid>

            </div>

        );
    }
}

export default Suggestion;
// =======
//     Grid, Col, Row,
//     Form, FormGroup, FieldGroup, FormControl, ControlLabel, InputGroup,
//     Image, Thumbnail, Button
// } from 'react-bootstrap';
//
// //Stylesheets
// import "../../../css/style.scss";
//
//
// class Suggestion extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: '',
//             description: '',
//             supplier: '',
//             webpage: '',
//             phone: '',
//             email: '',
//             address: '',
//             file: '',
//             imageURL: 'https://itavo.nl/img/placeholder.jpg',
//         };
//
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//
//
//     handleChange(event) {
//         this.setState({
//             [event.target.name]: event.target.value,
//         });
//     }
//
//     _handleImageChange(e) {
//         e.preventDefault();
//
//         let reader = new FileReader();
//         let file = e.target.files[0];
//
//         reader.onloadend = () => {
//
//             this.setState({
//                 file: file,
//                 imageURL: reader.result
//             });
//         }
//
//         reader.readAsDataURL(file)
//     }
//
//     handleSubmit(event) {
//         var data = new FormData()
//         data.append('file', this.state.file)
//         data.append('name', this.state.name)
//         data.append('description', this.state.description)
//         data.append('supplier', this.state.supplier)
//         data.append('webpage', this.state.webpage)
//         data.append('phone', this.state.phone)
//         data.append('address', this.state.address)
//         data.append('email', this.state.email)
//         alert('Namn: ' + this.state.name + '\nBeskrivning: ' + this.state.description);
//         fetch('http://localhost:5000/products/', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             mode: 'no-cors',
//             body: data
//         }).then(function (res) {
//             window.location.replace('http://localhost:8080/inspiration');
//         });
//     }
//
//     render() {
//         return (
//
//             <Grid id="content-container" className="show-grid">
//                 <Row>
//                     <Col lg={12} className="horizontal-container">
//                         <h3 className="page-title">Tipsa om en produkt</h3>
//                     </Col>
//                 </Row>
//                 <Form onSubmit={this.handleSubmit}>
//                     <Row>
//                         <Col lg={5} md={4} sm={6} xs={12} id="left-col">
//                             <div className="items-container">
//                                 <div className="image-container">
//                                     <div className="visible-xs">
//                                         <Image id="product-image" src={this.state.imageURL}/>
//                                         <div className="text-container">
//                                             <h3>Produktbild</h3>
//                                             <p>Lägg till en bild på produkten som fångar intresse.</p>
//
//                                             <input type="file" name="file" id="file" className="inputfile"
//                                                    onChange={(e) => this._handleImageChange(e)}/>
//                                             <label htmlFor="file" className="btn btn-default">Lägg till bild</label>
//                                         </div>
//                                     </div>
//
//                                     <Thumbnail src={this.state.imageURL} className="hidden-xs">
//                                         <h3>Produktbild</h3>
//                                         <p>Lägg till en bild på produkten som fångar intresse.</p>
//
//                                         <input type="file" name="file" id="file" className="inputfile"
//                                                onChange={(e) => this._handleImageChange(e)}/>
//                                         <label htmlFor="file" className="btn btn-default">Lägg till bild</label>
//                                     </Thumbnail>
//                                 </div>
//                             </div>
//                         </Col>
//
//                         <Col lg={7} md={7} sm={6} xs={12} id="right-col">
//                             <h3>Produkt</h3>
//
//                             <FormGroup>
//                                 <ControlLabel>Namn på produkt</ControlLabel>
//                                 <InputGroup>
//                                     <InputGroup.Addon><i className='fa fa-info-circle'/></InputGroup.Addon>
//                                     <FormControl
//                                         name='name'
//                                         type='text'
//                                         placeholder='Produktnamn'
//                                         onChange={this.handleChange}/>
//                                 </InputGroup>
//                             </FormGroup>
//
//                             <FormGroup>
//                                 <ControlLabel>Beskrivning av produkt</ControlLabel>
//                                 <FormControl
//                                     name='description'
//                                     componentClass='textarea'
//                                     placeholder='Beskrivning...'
//                                     onChange={this.handleChange}/>
//                             </FormGroup>
//
//                             <h3>Leverantör</h3>
//
//                             <FormGroup>
//                                 <ControlLabel>Namn</ControlLabel>
//                                 <InputGroup>
//                                     <InputGroup.Addon><i className='fa fa-truck'/></InputGroup.Addon>
//                                     <FormControl
//                                         name='supplier'
//                                         type='text'
//                                         placeholder='Leverantörens namn'
//                                         onChange={this.handleChange}/>
//                                 </InputGroup>
//                             </FormGroup>
//
//                             <FormGroup>
//                                 <ControlLabel>Hemsida</ControlLabel>
//                                 <InputGroup>
//                                     <InputGroup.Addon><i className='fa fa-globe'/></InputGroup.Addon>
//                                     <FormControl
//                                         name='webpage'
//                                         type='text'
//                                         placeholder='Hemsida'
//                                         onChange={this.handleChange}/>
//                                 </InputGroup>
//                             </FormGroup>
//
//                             <FormGroup>
//                                 <ControlLabel>Telefonnummer</ControlLabel>
//                                 <InputGroup>
//                                     <InputGroup.Addon><i className='fa fa-phone'/></InputGroup.Addon>
//                                     <FormControl
//                                         name='phone'
//                                         type='text'
//                                         placeholder='Nummer'
//                                         onChange={this.handleChange}/>
//                                 </InputGroup>
//                             </FormGroup>
//
//                             <FormGroup>
//                                 <ControlLabel>Email</ControlLabel>
//                                 <InputGroup>
//                                     <InputGroup.Addon><i className='fa fa-envelope'/></InputGroup.Addon>
//                                     <FormControl
//                                         name='email'
//                                         type='text'
//                                         placeholder='Email'
//                                         onChange={this.handleChange}/>
//                                 </InputGroup>
//                             </FormGroup>
//
//                             <FormGroup>
//                                 <ControlLabel>Adress</ControlLabel>
//                                 <InputGroup>
//                                     <InputGroup.Addon><i className='fa fa-address-card'/></InputGroup.Addon>
//                                     <FormControl
//                                         name='address'
//                                         type='text'
//                                         placeholder='Adress'
//                                         onChange={this.handleChange}/>
//                                 </InputGroup>
//                             </FormGroup>
//
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                             <Button id='submit-btn' bsStyle='default' bsSize='large' type='submit' block>Lägg till
//                                 produkt</Button>
//                         </Col>
//                     </Row>
//                 </Form>
//             </Grid>
//         );
//     }
// }
//
// export default Suggestion;
// >>>>>>> Stashed changes
