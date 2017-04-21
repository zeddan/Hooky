import React from "react";
import {Button} from "react-bootstrap";
import "../css/style.css";

export class Info extends React.Component {
	constructor() {
		super()
		this.state = {
			text1: 'Hooky presenterar nya produkter varje vecka. Gilla de produkter ni är intresserade av att beställa och tipsa oss om de produkter ni redan använder och älskar.',
			text2: 'Hooky kontaktar er som visat intresse för produkten och samlar era ordrar för att förhandla fram ett förmånligare pris hos leverantören.',
			text3: 'Hooky samlar alla era köp på en faktura och sköter all logistik.'
		}
	}

	render() {
		return (
			<div>
			<InfoText text={this.state.text1}/>
			<InfoText text={this.state.text2}/>
			<InfoText text={this.state.text3}/>
			</div>
		);
	};
}

class InfoText extends React.Component {
	render () {
		return (
			<div>
			<p>{this.props.text}</p>
			</div>
		);
	};
}

export default Info;
