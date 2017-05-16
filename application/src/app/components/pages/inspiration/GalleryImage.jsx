import React from 'react';
import * as _ from 'lodash';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class GalleryImage extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         likes: this.props.likes,
         name: this.props.name,
         provider: this.props.provider,
         elevation: this.props.elevation,
      };
      console.log("Gallery Image likes: " + this.state.likes);
      this.like = this.like.bind(this);
	this.haveILikedThisItem = this.haveILikedThisItem.bind(this);
    	};   

    haveILikedThisItem() {
        let userID = parseInt(this.props.user_id);
        let ids = this.state.likes.map((like) => { return like.user.id; });
        return _.includes(ids, userID);
    }

   onMouseOver = () => this.setState({ elevation: 3 });
   onMouseOut = () => this.setState({ elevation: 1 });

   render() {
      return (
         <MuiThemeProvider>
            <Paper
               className={(this.props.isDetail) ? 'gallery-card detail-card' : 'gallery-card'}
               zDepth={this.state.elevation}
               onMouseOver={this.props.enableLift && this.onMouseOver}
               onMouseOut={this.props.enableLift && this.onMouseOut}
		onClick={this.props.handleClick}>
               <div className='bg'></div>
               <div className='info'>
                  <div className='name'>{this.state.name}</div>
                  <div className='provider'>{this.state.provider}</div>
                  <div className='like-heart'
                     onClick={this.like}>
                     <div className='likes'>{this.state.likes.length}</div>
			{ this.haveILikedThisItem() ?
                            <i className="heart fa fa-heart" aria-hidden="true"></i>
                            :
                            <i className="heart fa fa-heart-o" aria-hidden="true"></i>
                        }
                  </div>
               </div>
               <img className='gallery-thumbnail'
                  src={this.props.src}
                 
                  alt={this.props.alt}/>
            </Paper>
         </MuiThemeProvider>
      );
   };

    like(e) {
        e.stopPropagation();
        fetch('http://localhost:5000/like/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: 2,
                product_id: this.props.p_id
            })
        }).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({likes: json.product.likes});
        });
    };

}

export default GalleryImage;
