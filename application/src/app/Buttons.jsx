import React from 'react';
import {Button} from 'react-bootstrap';

var {
	IndexLink,
	Link
} = ReactRouter;

var LinkedinBtn = React.createClass( {

		login() {
			console.log("continue with linkedin");
			fetch('http://localhost:5000/authorize/linkedin', { redirect: 'follow', mode: 'no-cors'})
				.then((response) => { 
					console.log(response);
				});
		},
		render () {

		return (
			<a href="http://localhost:5000/authorize/linkedin">
			<Button>Continue with LinkedIn</Button>
			</a>
		);
	}
});


const LoginBtn = React.createClass({
	render: function() {
		return (
			<div>
			<Button>Log in</Button>
			</div>
		);
	}
});

export default LinkedinBtn;
