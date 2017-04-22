import React from 'react';

class GalleryImage extends React.Component {
    render() {
        return(
            <img className={this.props.className} src={this.props.src} alt={this.props.alt} />
        )
    }
}

export default GalleryImage
