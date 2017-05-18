import React from 'react';
import {Link} from "react-router";
import {browserHistory} from 'react-router';
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
				file: '',
				image: '',
				product: '',
				name: '',
				description: '',
				supplier: '',
				supplier_description: '',
				webpage: '',
				phone: '',
				email: '',
				address: '',
				published: '',
				publish:'Publicera',
				added_by: ''
			};

			this.handleChange = this.handleChange.bind(this);
			this.handleSubmit = this.handleSubmit.bind(this);
			this.handleCheckbox = this.handleCheckbox.bind(this);
			this.deleteProduct = this.deleteProduct.bind(this);
			this.publish = this.publish.bind(this);
		}

    componentDidMount() {
        fetch('http://localhost:5000/products/' + this.props.routeParams.productId)
        .then((res) => {
          return res.json();
        }).then((json) => {
          this.setState({
		  product: json.product,
		  added_by: json.product.added_by,
		  image: json.product.image,
		  name: json.product.name,
		  description: json.product.description,
		  supplier: json.product.supplier,
		  supplier_description: json.product.supplier_description,
		  webpage: json.product.webpage,
		  phone: json.product.phone,
		  email: json.product.email,
		  address: json.product.address,
		  published: json.product.published,
		  publish: (json.product.published) ? 'Avpublicera' : 'Publicera' 
	  });
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

		handleCheckbox() {
			this.setState({
				published: !this.state.published
			})
		}

		_handleImageChange(e) {
			e.preventDefault();

			let reader = new FileReader();
			let file = e.target.files[0];

			reader.onloadend = () => {

				this.setState({
					file: file,
					image: reader.result
				});
			}

			reader.readAsDataURL(file)
		}

		deleteProduct() {
			fetch('http://localhost:5000/products/'+this.state.product.id+'/', {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json'
				}
			}).then(()=>{
				window.location.assign('http://localhost:8080/admin');
			});
		}

		publish(event) {
			this.setState({published: !this.state.published})
			this.handleSubmit(event);
		}

		handleSubmit(event) {
			return new Promise((resolve, reject) => {
			event.preventDefault();
			console.log(this.state.published)
			var data = new FormData();
			data.append('file', this.state.file);

			fetch('http://localhost:5000/images/', {
				method: 'POST',
				body: data
			}).then((response) => response.json())
			.then((responseData)=> {
				console.log(responseData.image);
				if(responseData.image != ''){
					this.setState({image:responseData.image})
				}
			}).then(()=>{

			fetch('http://localhost:5000/products/'+this.state.product.id+'/', {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: this.state.name,
					description: this.state.description,
					supplier: this.state.supplier,
					supplier_description: this.state.supplier_description,
					webpage: this.state.webpage,
					phone: this.state.phone,
					email: this.state.email,
					image: this.state.image,
					address: this.state.address,
					published: this.state.published
				})
			})
			}).then(function(res){
                                window.location.assign('http://localhost:8080/admin');
                        }).done();

			this.state.file = '';
			});
			
		}

		onClickBack() {
    			  browserHistory.push('/admin');
   		}

		render() {
			return (

				<Grid id="content-container" className="show-grid">
					<Form onSubmit={this.handleSubmit}>
						<Row>
							<Col lg={5} md={4} sm={6} xs={12} id="left-col">
								<div className="items-container">
				<div className="back-container horizontal-container" onClick={this.onClickBack}>
				                        <i className="material-icons icon">arrow_back</i>
				                        <p>Alla produkter</p>
				                   </div>
									<div className="image-container">
										<div className="visible-xs">
											<Image id="product-image" src={this.state.image}/>
											<div className="text-container">
												<h3>Produktbild</h3>
												<p>Lägg till en bild på produkten som fångar intresse.</p>

												<input type="file" name="file" id="file" className="inputfile" onChange={(e)=>this._handleImageChange(e)}/>
												<label htmlFor="file" className="btn btn-default">Lägg till bild</label>
											</div>
										</div>

									<Thumbnail src={this.state.image} className="hidden-xs">
										<h3>Produktbild</h3>
										<p>Lägg till en bild på produkten som fångar intresse.</p>

										<input type="file" name="file" id="file" className="inputfile" onChange={(e)=>this._handleImageChange(e)}/>
										<label htmlFor="file" className="btn btn-default">Lägg till bild</label>
									</Thumbnail>
									</div>
								<h3>Tipsad av:</h3>
								<p>{this.state.added_by.name}, {this.state.added_by.company}</p>
								<p>{this.state.added_by.email}</p>
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
                                                                        <ControlLabel>Beskrivning av leverantör</ControlLabel>
                                                                        <FormControl
                                                                                name='supplier_description'
                                                                                componentClass='textarea'
                                                                                placeholder='Beskrivning...'
                                                                                value={this.state.supplier_description}
                                                                                onChange={this.handleChange} />
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
								<Button id='submit-btn' onClick={this.publish} bsStyle='success' bsSize='large' block>{this.state.publish}</Button>
								<Button id='submit-btn' bsStyle='info' bsSize='large' type='submit' block>Uppdatera produkt</Button>
                                                                <Button id='submit-btn' onClick={this.deleteProduct} bsStyle='danger' bsSize='large' block>Ta bort produkt</Button>
                                                        </Col>
						</Row>
					</Form>
				</Grid>
			);
		}
	}

	export default AdminSuggestion;
