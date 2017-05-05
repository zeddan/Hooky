import React from 'react';
import {Link} from "react-router";

//Components
import {Grid, Col, Row, FieldGroup, FormControl, ControlLabel, FormGroup, InputGroup, Image, Thumbnail, Button} from 'react-bootstrap';
import ProductForm from '../../forms/ProductForm.jsx';

import './sass/Tips.scss';
class Tips extends React.Component {

	handleImage() {

	}

	render() {
		return (

			<Grid id="content-container" className="show-grid">
				<Row>
					<Col lg={5} md={4} sm={6} xs={6} id="left-col">
						<div className="items-container" >
						<div className="image-container">
						<Thumbnail src="https://www.highmowingseeds.com/pub/media/catalog/product/cache/1/image/675x675/e9c3970ab036de70892d86c6d221abfe/2/6/2686.jpg">
								<h3>Produktbild</h3>
								<p>Lägg till en bild på produkten som fångar intresse.</p>
								<p>
									<Button bsStyle="primary">Lägg till bild</Button>&nbsp;
									<Button bsStyle="default">Ta bort bild</Button>
								</p>
							</Thumbnail>
							</div>
							</div>
					</Col>

					<Col lg={7} md={7} sm={6} xs={6} id="right-col">
						<FormGroup>
							<ControlLabel>Namn på produkt</ControlLabel>
							<InputGroup>
								<InputGroup.Addon><i className="fa fa-info-circle"/></InputGroup.Addon>
								<FormControl
									id="formControlsText"
									type="text"
									placeholder="Produktnamn"/>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<ControlLabel>Leverantör</ControlLabel>
							<InputGroup>
								<InputGroup.Addon><i className="fa fa-truck"/></InputGroup.Addon>
								<FormControl
									id="formControlsText"
									type="text"
									placeholder="Leverantörens namn"/>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<ControlLabel>Leverantörens hemsida</ControlLabel>
							<InputGroup>
								<InputGroup.Addon><i className="fa fa-globe"/></InputGroup.Addon>
								<FormControl
									id="formControlsText"
									type="text"
									placeholder="Hemsida"/>
							</InputGroup>
						</FormGroup>

						<FormGroup>
							<ControlLabel>Leverantörens kontaktuppgifter</ControlLabel>
							<InputGroup>
								<InputGroup.Addon><i className="fa fa-address-book"/></InputGroup.Addon>
								<FormControl
									id="formControlsText"
									type="text"
									placeholder="Kontaktuppgifter"/>
							</InputGroup>
						</FormGroup>

						<FormGroup controlId="formControlsTextarea">
							<ControlLabel>Information om produkt</ControlLabel>
							<FormControl componentClass="textarea" placeholder="Information..." />
						</FormGroup>

					</Col>
				</Row>

				<Row>

				</Row>
			</Grid>
		);
	}
}

export default Tips;
