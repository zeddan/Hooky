import React from 'react';
import "../../../css/inspiration.scss";
import "../../../css/detail.scss";
import GalleryImage from "../inspiration/GalleryImage.jsx";


class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            product: ''
        };
    }

    componentDidMount() {
        console.log("Did mount");
        fetch('http://localhost:5000/products/' + this.props.routeParams.productId).then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({product: json.product});
            console.log("State: " + this.state.product);
        });
    }

    render() {
        if (this.state.product.likes === undefined) {
            return null;
        }
        return (
            <div className="detail-container">
                <div className="detail-info-container">
                    <GalleryImage likes={this.state.product.likes}
                                  name={this.state.product.name}
                                  provider="Jeff"
                                  p_id={this.state.product.id}
                                  src={this.state.product.image}
                                  alt={this.state.product.name}/>

                    <div className="detail-info-description">
                        <h1 className="hidden-sm hidden-xs">{this.state.product.name}</h1>
                        <p>{this.state.product.description}</p>
                    </div>
                </div>
                <div className="detail-comments">

                    <h2 className="center-text">Kommentarer</h2>
                </div>
            </div>
        );
    };
}

export default Detail;
