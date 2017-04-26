import React from 'react';

class GalleryImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.likes
        };
    };

    render() {
        return(
            <div className='gallery-card'>
                <div className='bg'></div>
                <div className='info'>
                    <div className='name'>LÖK</div>
                    <div className='provider'>Bosses gård</div>
                    <div className='like-heart'
                         onClick={() => this.like()}>
                        <div className='likes'>{this.state.likes.length}</div>
                        <i className="heart fa fa-heart-o" aria-hidden="true"></i>
                    </div>
                </div>
                <img className='gallery-thumbnail'
                     src={this.props.src}
                     onClick={this.props.handleClick}
                     alt={this.props.alt} />
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
        }).then((res) => { return res.json();
        }).then((json) => { this.setState({ likes: json.product.likes });
        });
    };

}

export default GalleryImage;
