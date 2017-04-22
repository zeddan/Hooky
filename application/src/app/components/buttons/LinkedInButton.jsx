import React from 'react';

//Components
import {Button} from 'react-bootstrap';

class LinkedinBtn extends React.Component {
	render () {
		return (
			<a href="http://localhost:5000/authorize/linkedin">
			<Button bsStyle="primary">Continue with LinkedIn</Button>
			</a>
		)
	}
}

export default LinkedinBtn;
