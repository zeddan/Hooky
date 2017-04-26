import React from 'react';
import GalleryImage from './GalleryImage.jsx';
import GalleryModal from './GalleryModal.jsx';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            showModal: false,
            url: ''
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    };

    componentDidMount() {
        fetch('http://localhost:5000/products/').then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({ products: json.products });
        });
    };

    render() {
        const imgUrls = this.props.imgUrls;
        return(
            <div className='container-fluid gallery-container'>
                <div className='row'>
                    {
                        this.state.products.map((product, index) => {
                            return (
                                <div key={index + 1} className='col-sm-6 col-md-3 col-xl-2'>
                                    <GalleryImage className='gallery-thumbnail'
                                                  likes={product.likes}
                                                  src={product.image}
                                                  handleClick={(e) => this.openModal(product.image, e)}
                                                  alt={'Image number ' + (index + 1)} />
                                </div>
                            );
                        })
                    }
                </div>
                <GalleryModal isOpen={this.state.showModal} onClick={this.closeModal} src={this.state.url} /> 
            </div>
        );
    };

    openModal(url, e) {
        this.setState({
            showModal: true,
            url: url
        });
    };

    closeModal() {
        this.setState({
            showModal: false,
            url: ''
        });
    };
}

export default Gallery;
