import React from 'react';


class Info extends React.Component {
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
            <div id="number">
                <div id="move">
                    <h2 id="howItWorks">Så här går det till...</h2>
                </div>
                <div id="move2">
                    <InfoText text={this.state.text1} nbr={1}/>
                    <InfoText text={this.state.text2} nbr={2}/>
                    <InfoText text={this.state.text3} nbr={3}/>
                </div>
            </div>
        );
    };
}

class InfoText extends React.Component {
    render() {
        return (
            <div id="infotext">
                <h1 className="info-nbr">{this.props.nbr}</h1>
                <p className="left-align">{this.props.text}</p>

            </div>

        );
    };
}

export default Info;
