import React from 'react';

//Components
import {Button, Col, Grid, Row} from 'react-bootstrap';

//Stylesheets
import '../../../css/info.scss';

class Footer extends React.Component {

	render() {
		return (
			<div id="number">

                <h2>Hooky</h2>
                <p>Made with love in Malmö</p>
                <p>- 2017 -</p>
            </div>
		);
	};
}

export default Footer;
