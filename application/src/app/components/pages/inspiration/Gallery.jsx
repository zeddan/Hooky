import React from 'react';
import GalleryImage from './GalleryImage.jsx';
import GalleryModal from './GalleryModal.jsx';

class Gallery extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            url: ''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    render() {
        const imgUrls = this.props.imgUrls;
        return(
                <div className='container-fluid gallery-container'>
                    <div className='row'>
                        {
                            imgUrls.map((url, index) => {
                                return (
                                    <div key={index + 1} className='col-sm-6 col-md-3 col-xl-2'>
                                        <div className='gallery-card'>
                                            <div className='like-heart'>
                                                <div className='likes'>5</div>
                                                <i className="heart fa fa-heart-o" aria-hidden="true"></i>
                                            </div>
                                            <GalleryImage className='gallery-thumbnail' src={url} alt={'Image number ' + (index + 1)} />
                                            <span className='card-icon-open fa fa-expand' value={url} onClick={(e) => this.openModal(url, e)}></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <GalleryModal isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} /> 
                </div>
        )
    }

    openModal(url, e) {
        this.setState({
            showModal: true,
        url: url
        })
    };

    closeModal() {
        this.setState({
            showModal: false,
            url: ''
        })
    }
}

export default Gallery;
