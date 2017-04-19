import React from 'react';
import {Button} from "react-bootstrap";

class LoginBtn extends React.Component {
	login() {
		fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'bob@madde.se',
				password: 'xyz',
			})
		})
	}
		render() {
			return (
				<Button onClick={this.login}>Log in</Button>
			)
		}
}

	export default LoginBtn

class LoginForm extends React.Component {

}
