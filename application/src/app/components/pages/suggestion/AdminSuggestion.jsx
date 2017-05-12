import React from 'react';
import {Link} from "react-router";

//Components
import {
	Grid, Col, Row,
	Form, FormGroup, FieldGroup, FormControl, ControlLabel, InputGroup,
	Image, Thumbnail, Checkbox, Button, Panel} from 'react-bootstrap';
	import ProductForm from '../../forms/ProductForm.jsx';

	//Stylesheets
	import './sass/Tips.scss';

	class AdminSuggestion extends React.Component {

		constructor(props) {
			super(props);
			this.state = {
				product: '',
				name: '',
				description: '',
				supplier: '',
				webpage: '',
				phone: '',
				email: '',
				address: ''
			};

			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
		}

    componentDidMount() {
        fetch('http://localhost:5000/products/' + this.props.routeParams.productId)
        .then((res) => {
          return res.json();
        }).then((json) => {
          this.setState({
		  product: json.product, 
		  name: json.product.name,
		  description: json.product.description,
		  supplier: json.product.supplier,
		  webpage: json.product.webpage,
		  phone: json.product.phone,
		  email: json.product.email,
		  address: json.product.address
	  });
          console.log(this.state.product);
        });
    }

		handleChange(event) {
			const target = event.target;
			const value = target.value;
			const name = target.name;

			this.setState({
				[name]: value,
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

		handleSubmit(event) {
			event.preventDefault();
			/*
			var data = new FormData()
			data.append('file', this.state.file);
			data.append('name', this.state.name);
			data.append('description', this.state.description);
			data.append('supplier', this.state.supplier);
			alert('Namn: ' + this.state.name +'\nBeskrivning: ' + this.state.description);
			fetch('http://localhost:5000/products/', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				mode: 'no-cors',
				body: data
			});

			this.state.file = '';
			*/
		}

		render() {
			return (

				<Grid id="content-container" className="show-grid">
					<Form onSubmit={this.handleSubmit}>
						<Row className="top-row">
							<Col lg={5} md={4} sm={6} xs={12} id="left-col">
								<div className="items-container">
									<div className="image-container">
										<div className="visible-xs">
											<Image id="product-image" src={this.state.product.image}/>
											<div className="text-container">
												<h3>Produktbild</h3>
												<p>Lägg till en bild på produkten som fångar intresse.</p>

												<input type="file" name="file" id="file" className="inputfile" onChange={(e)=>this._handleImageChange(e)}/>
												<label htmlFor="file" className="btn btn-default">Lägg till bild</label>
											</div>
										</div>

									<Thumbnail src={this.state.product.image} className="hidden-xs">
										<h3>Produktbild</h3>
										<p>Lägg till en bild på produkten som fångar intresse.</p>

										<input type="file" name="file" id="file" className="inputfile" onChange={(e)=>this._handleImageChange(e)}/>
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
											value={this.state.name}
											onChange={this.handleChange}/>
									</InputGroup>
								</FormGroup>

								<FormGroup>
									<ControlLabel>Beskrivning av produkt</ControlLabel>
									<FormControl
										name='description'
										componentClass='textarea'
										placeholder='Beskrivning...'
										value={this.state.description}
										onChange={this.handleChange} />
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
											value={this.state.supplier}
											onChange={this.handleChange}/>
									</InputGroup>
								</FormGroup>

								<FormGroup>
									<ControlLabel>Hemsida</ControlLabel>
									<InputGroup>
										<InputGroup.Addon><i className='fa fa-globe'/></InputGroup.Addon>
										<FormControl
											name='webpage'
											type='text'
											placeholder='Hemsida'
											value={this.state.webpage}
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
											value={this.state.phone}
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
											value={this.state.email}
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
											value={this.state.address}
											onChange={this.handleChange}/>
									</InputGroup>
								</FormGroup>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button id='submit-btn' bsStyle='danger' bsSize='large' type='submit' block>Lägg till produkt</Button>
							</Col>
						</Row>
					</Form>
				</Grid>
			);
		}
	}

	export default AdminSuggestion;
