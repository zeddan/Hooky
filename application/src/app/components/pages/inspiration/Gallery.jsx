import React from 'react';
import GalleryImage from './GalleryImage.jsx';
import {browserHistory} from "react-router";
import {Button} from 'react-bootstrap';
import * as _ from 'lodash';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      dateBtn: true,
      likeBtn: false,
    };
    this.openDetail = this.openDetail.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByLikes = this.sortByLikes.bind(this);
  };

  componentDidMount() {
    fetch('http://localhost:5000/products/').then((res) => {
      return res.json();
    }).then((json) => {
      console.log(json.products);
      this.setState({products: json.products});
      this.sortByDate();
    });
  };

  sortByDate() {
    var newArr = this.state.products.sort(function(a, b) {
      var aa = new Date(a.pub_date);
      var bb = new Date(b.pub_date);

      if (aa !== bb) {
        if (aa > bb) { return -1; }
        if (aa < bb) { return 1; }
      }
      return aa - bb;
    });

    this.setState(
      {products: newArr,
        dateBtn: true,
        likeBtn: false}
      );
    };

    sortByLikes() {
      var newArr = this.state.products.sort(function(a, b){
        return b.likes.length - a.likes.length;
      });
      this.setState(
        {products: newArr,
          dateBtn: false,
          likeBtn: true}
        );
      }

      render() {
        return (
          <div>
            <div className="gallery-sorting-container">
              <Button bsStyle="link" onClick={this.sortByDate} disabled={this.state.dateBtn}>Senast Tillagda</Button>
              <Button bsStyle="link" onClick={this.sortByLikes} disabled={this.state.likeBtn}>Flest Likes</Button>
              <Button bsStyle="link">Mina Likes</Button>
            </div>
            <div className='container-fluid gallery-container'>
              <div className='row'>
                {
                  this.state.products.map((product) => {
                    return (

                      <div key={product.id} className='col-sm-6 col-md-3 col-xl-2'>

                        <GalleryImage likes={product.likes}
                          elevation={1}
                          enableLift={true}
                          name={product.name}
                          provider={product.supplier}
                          p_id={product.id}
                          src={product.image}
                          handleClick={(e) => this.openDetail(product, e)}
                          alt={'Image number ' + product.id}/>
                      </div>
                    );
                  })
                }
              </div>
            </div>
          </div>
        );
      };

      openDetail(product, e) {
        const path = `/inspiration/detail/${product.id}`;
        browserHistory.push(path);
      };
    }

    export default Gallery;
