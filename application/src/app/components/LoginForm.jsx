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

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
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

	handleSubmit(event) {
		alert('Email: ' + this.state.email +'\nPassword: ' + this.state.password);
		fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				        'Accept': 'application/json',
				        'Content-Type': 'application/json'
				    },
			mode: 'no-cors',
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
		
		event.preventDefault();
	}
	render() {
		return (
			<Form horizontal onSubmit={this.handleSubmit}>
			<FormGroup controlId="formHorizontalEmail">
			<Col componentClass={ControlLabel} sm={2}>
			Email
			</Col>
			<Col sm={10}>
			<FormControl name='email' type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
			</Col>
			</FormGroup>

			<FormGroup controlId="formHorizontalPassword">
			<Col componentClass={ControlLabel} sm={2}>
			Password
			</Col>
			<Col sm={10}>
			<FormControl name='password' type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
			</Col>
			</FormGroup>

			<FormGroup>
			<Col smOffset={2} sm={10}>
			<Checkbox>Remember me</Checkbox>
			</Col>
			</FormGroup>

			<FormGroup>
			<Col smOffset={2} sm={10}>
			<Button type="submit">
			Sign in
			</Button>
			</Col>
			</FormGroup>
			</Form>

		)
	}}


export default LoginForm 