import React from 'react';
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
      fetch('http://localhost:5000/products/').then((res) => {
          return res.json();
      }).then((json) => {
          console.log(json.products);
          this.setState({products: json.products});
      });
  };

  onListItemClick(e) {
    console.log(e);
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col>
            <Table
              entries={this.state.products}
              handleClick={(e) => this.onListItemClick(e)}
              />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default SuggestionsList;
