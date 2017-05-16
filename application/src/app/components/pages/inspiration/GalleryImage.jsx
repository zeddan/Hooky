import React from 'react';
import * as _ from 'lodash';

class GalleryImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.likes,
            name: this.props.name,
            provider: this.props.provider

        };
        this.like = this.like.bind(this);
        this.haveILikedThisItem = this.haveILikedThisItem.bind(this);
    };

    haveILikedThisItem() {
        let userID = parseInt(this.props.user_id);
        let ids = this.state.likes.map((like) => { return like.user.id; });
        return _.includes(ids, userID);
    }

    render() {
        return (
            <div className='gallery-card' onClick={this.props.handleClick}>
                <div className='bg'></div>
                <div className='info'>
                    <div className='name'>{this.state.name}</div>
                    <div className='provider'>{this.state.provider}</div>
                    <div className='like-heart'
                        onClick={() => this.like()}>
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
            </div>
        );
    };

    like() {
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
