import React from 'react';
import GalleryImage from './GalleryImage.jsx';
import {browserHistory} from "react-router";
import {Button} from 'react-bootstrap';
import Cookies from 'js-cookie';

class Gallery extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         products: [],
         displayProducts: [],
         dateBtn: true,
         likeBtn: false,
	 myLikes: false,
         userID: -1
      };
      this.openDetail = this.openDetail.bind(this);
      this.sortByDate = this.sortByDate.bind(this);
      this.sortByLikes = this.sortByLikes.bind(this);
      this.showMyLikes = this.showMyLikes.bind(this);
   };

   componentWillMount() {
      this.setState({
         userID: Cookies.get('user_id')
      });
   }

   componentDidMount() {
      fetch('http://localhost:5000/products/').then((res) => {
         return res.json();
      }).then((json) => {
	 var arr = [];
	 for (var i = 0; i < json.products.length; i++) {
		 if(json.products[i].published == true){
		 	arr.push(json.products[i]);
		 }
	 }
         this.setState({products: arr});
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
      this.setState({
         displayProducts: newArr,
         dateBtn: true,
         likeBtn: false,
	 myLikes: false
      });
   };

   sortByLikes() {
      var newArr = this.state.products.sort(function(a, b){
         return b.likes.length - a.likes.length;
      });
      this.setState({
         displayProducts: newArr,
         dateBtn: false,
         likeBtn: true,
	 myLikes: false
      });
   }

   showMyLikes() {
	var newArr = this.state.products.filter((product) => {
          var liked = false;
          product.likes.map((like) => {
             if(like.user.id == this.state.userID){
                liked = true;
              }
	  });
	return liked;
	});
	   this.setState({
		   displayProducts: newArr,
		   dateBtn: false,
		   likeBtn: false,
		   myLikes: true
	   });
   }


   render() {
      return (
         <div>
            <div className="gallery-sorting-container">

              <Button bsStyle="link" onClick={this.sortByDate} disabled={this.state.dateBtn}>Nya</Button>
              <Button bsStyle="link" onClick={this.sortByLikes} disabled={this.state.likeBtn}>Populära</Button>
              <Button bsStyle="link" onClick={this.showMyLikes} disabled={this.state.myLikes}>Mina</Button>

            </div>
            <div className='container-fluid gallery-container'>
               <div className='row'>
                  {
                     this.state.displayProducts.map((product) => {
                        return (

                           <div key={product.id} className='col-sm-6 col-md-3 col-xl-2'>

                              <GalleryImage likes={product.likes}
                                 elevation={1}
                                 enableLift={true}
                                 name={product.name}
                                 provider={product.supplier}
                                 p_id={product.id}
                                 user_id={this.state.userID}
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
