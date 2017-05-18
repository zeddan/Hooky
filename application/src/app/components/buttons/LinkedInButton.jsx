import React from 'react';

//Components
import {Button} from 'react-bootstrap';

var linkedinSrc = "app/components/buttons/linkedin.png";

var linkStyle={
    padding:0
}
var imgStyle = {
    width: 100 + '%',
    margin: 0,
    padding: 0
}


class LinkedinBtn extends React.Component {

    render() {
        return (
            <a className="btn" href="http://localhost:5000/authorize/linkedin" style={linkStyle}>
                <img style={imgStyle} src={linkedinSrc} alt="Linked In"/>
                {/*<button type="image" style="background:'./linkedin.png">Registrera med LinkedIn</button>*/}
                {/*<Button bsStyle="primary">Registrera med LinkedIn</Button>*/}
            </a>
        )
    }
}

export default LinkedinBtn;
