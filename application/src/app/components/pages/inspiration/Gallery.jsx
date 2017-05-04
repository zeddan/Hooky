import React from 'react';
import GalleryImage from './GalleryImage.jsx';
import {browserHistory} from "react-router";
import {Button} from 'react-bootstrap';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.openDetail = this.openDetail.bind(this);
    };

    componentDidMount() {
        fetch('http://localhost:5000/products/').then((res) => {
            return res.json();
        }).then((json) => {
            console.log(json.products);
            this.setState({products: json.products});
        });
    };

    render() {
        return (
            <div>
                <div className="gallery-sorting-container">
                    <Button bsStyle="link">Senast Tillagda</Button>
                    <Button bsStyle="link">Flest Likes</Button>
                    <Button bsStyle="link">Mina Likes</Button>
                </div>
                <div className='container-fluid gallery-container'>
                    <div className='row'>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <div key={index + 1} className='col-sm-6 col-md-3 col-xl-2'>
                                        <GalleryImage likes={product.likes}
                                                      name={product.name}
                                                      provider={product.supplier}
                                                      p_id={product.id}
                                                      src={product.image}
                                                      handleClick={(e) => this.openDetail(product, e)}
                                                      alt={'Image number ' + (index + 1)}/>
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
