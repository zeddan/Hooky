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
	  var prods = [];
	  for(var i = 0; i < json.products.length; i++){
		  if(json.products[i].published != true) {
			  prods.push(json.products[i])
		  }
	  }
          this.setState({products: prods});
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
