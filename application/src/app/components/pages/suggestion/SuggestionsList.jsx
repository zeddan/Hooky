import React from 'react';
import {browserHistory} from "react-router";


//Components
import {
  Grid, Row, Col,
  ListGroup, ListGroupItem
} from 'react-bootstrap';
import Table from './Table.jsx';
//Stylesheets
import '../../../css/SuggestionsList.scss';

class SuggestionsList extends React.Component{
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
      fetch('http://localhost:5000/products').then((res) => {
          return res.json();
      }).then((json) => {
          console.log(json);
          this.setState({products: json.products});
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
            <Table
              entries={this.state.products}
              handleClick={(prod) => this.onListItemClick(prod)}
              />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SuggestionsList;
