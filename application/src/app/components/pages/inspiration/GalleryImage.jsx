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
            liked: false
        };
 console.log("Gallery Image likes: " + this.state.likes);
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
        this.update = this.update.bind(this);
        this.haveILikedThisItem = this.haveILikedThisItem.bind(this);
    };

    componentWillMount() {
        this.setState({
            liked: this.haveILikedThisItem()
        });
    }

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
                    onClick={this.toggleLike}>
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

    toggleLike(e) {
        e.stopPropagation();
        if (this.state.liked) {
            this.unlike(e);
        } else {
            this.like(e);
      }
    }

    unlike(e, update) {
        fetch('http://localhost:5000/like/', {
            method: 'DELETE',
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
            this.update(json);
        });
    }

    like(e) {
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
            this.update(json);
        });
    };

    update(json) {
        this.setState({ likes: json.product.likes, });
        this.setState({ liked: this.haveILikedThisItem() });
    }

}

export default GalleryImage;
