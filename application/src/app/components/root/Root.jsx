import React from 'react';

//Components
import NavBar from './NavBar.jsx';
import NavigationBar from './NavigationBar.jsx';

import {Row, Col} from 'react-bootstrap';
//Stylesheets
import '../../css/style.scss';

class Root extends React.Component{
    render() {
        return (
           <div>
                <Row>
                    <Col xs={10} xsOffset={1}>
                        <NavigationBar />
                    </Col>
                </Row>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Root;
