import React from 'react';
import {browserHistory} from "react-router";

//Components
import {
    Grid, Row, Col
} from 'react-bootstrap';
import Table from './Table.jsx';
//Stylesheets
import '../../../css/style.scss';

class SuggestionsList extends React.Component {
    constructor() {
        super();
        this.state = {
            published: [],
            unpublished: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/products').then((res) => {
            return res.json();
        }).then((json) => {
            console.log(json);
            var unpublished = [];
            var published = [];
            for (var i = 0; i < json.products.length; i++) {
                if (json.products[i].published != true) {
                    unpublished.push(json.products[i])
                } else {
                    published.push(json.products[i])
                }
            }
            this.setState({
                published: published,
                unpublished: unpublished
            });
        });
    };

    onListItemClick(productId) {
        const path = `/admin/suggestion/${productId}`;
        browserHistory.push(path);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col>
                        <h3>Opublicerade produkter</h3>
                        <Table
                            entries={this.state.unpublished}
                            handleClick={(prod) => this.onListItemClick(prod)}
                        />
                        <h3>Publicerade produkter</h3>
                        <Table
                            entries={this.state.published}
                            handleClick={(prod) => this.onListItemClick(prod)}
                        />
                    </Col>
                </Row>
            </Grid>
        );
    }

}

export default SuggestionsList;
