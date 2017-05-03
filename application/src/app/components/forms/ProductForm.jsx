import React from 'react';
import {
	Button,
	Form,
	FormGroup,
	Col,
	Checkbox,
	ControlLabel,
	FormControl
} from 'react-bootstrap';

class ProductForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			file: '',
			imageURL: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
		var data = new FormData()
		data.append('file', this.state.file)
		data.append('name', this.state.name)
		data.append('description', this.state.description)
		alert('Namn: ' + this.state.name +'\nBeskrivning: ' + this.state.description);
		fetch('http://localhost:5000/products/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: 'no-cors',
			body: data
		})

		this.state.file = '';
	}
	render() {
		return (
			<Form horizontal onSubmit={this.handleSubmit}>

			<FormGroup controlId="formHorizontalEmail">
			<Col componentClass={ControlLabel} sm={2}>
			Name
			</Col>
			<Col sm={10}>
			<FormControl name='name' type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
			</Col>
			</FormGroup>

			<FormGroup controlId="formControlsTextarea">
			<Col componentClass={ControlLabel} sm={2}>
			Description
			</Col>
			<Col sm={10}>
			<FormControl name='description' componentClass="textarea" placeholder="description" value={this.state.description} onChange={this.handleChange} />
			</Col>
			</FormGroup>

			<FormGroup controlId="formControlsFile">
			<Col sm={12}>
			<FormControl name="image" type="file" label="image" onChange={(e)=>this._handleImageChange(e)}/>
			</Col>
			</FormGroup>

			<FormGroup>
			<Col smOffset={2} sm={10}>
			<Button type="submit">
			Submit
			</Button>
			</Col>
			</FormGroup>
			</Form>

		)
	}}


export default ProductForm 
