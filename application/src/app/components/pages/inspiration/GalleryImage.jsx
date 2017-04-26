import React from 'react';

class GalleryImage extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <div className='gallery-card'>
                <div className='like-heart'>
                    <div className='likes'>{this.props.likes.length}</div>
                    <i className="heart fa fa-heart-o" aria-hidden="true"></i>
                </div>
                <img className={this.props.className}
                     src={this.props.src}
                     onClick={this.props.handleClick}
                     alt={this.props.alt} />
            </div>
        );
    };
}

export default GalleryImage;
