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
		alert('Namn: ' + this.state.name +'\nBeskrivning: ' + this.state.description);
		fetch('http://localhost:5000/images/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: 'no-cors',
			body: data
		})

		event.preventDefault();
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

			<Col componentClass={ControlLabel} sm={2}>
			Description
			</Col>
			<Col sm={10}>
			<FormGroup controlId="formControlsTextarea">
			<FormControl name='description' componentClass="textarea" placeholder="description" value={this.state.description} onChange={this.handleChange} />
			</FormGroup>
			</Col>

			<FormGroup controlId="formControlsFile">
			<FormControl name="image" type="file" label="image" onChange={(e)=>this._handleImageChange(e)}/>
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
