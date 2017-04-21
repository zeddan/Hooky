import React from 'react';
import {Button} from 'react-bootstrap';


class LinkedinBtn extends React.Component {
	render () {
		return (
			<a href="http://localhost:5000/authorize/linkedin">
			<Button>Continue with LinkedIn</Button>
			</a>
		)
	}
}

export default LinkedinBtn;
