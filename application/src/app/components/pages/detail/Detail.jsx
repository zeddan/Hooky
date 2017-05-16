import React from 'react';
import {browserHistory} from 'react-router';
import "../../../css/inspiration.scss";
import "../../../css/detail.scss";
import GalleryImage from "../inspiration/GalleryImage.jsx";

import {Row, Col, Image} from 'react-bootstrap';
import LikeList from "./LikeList.jsx";

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

    onClickBack() {
        browserHistory.push('/inspiration');
    }

    render() {
        if (this.state.product.likes === undefined) {
            return null;
        }
        return (
            <div className="detail-container">
                <Row>
                    <Col lg={12}>
                        <div className="top-row">
                            <div className="back-container horizontal-container" onClick={this.onClickBack}>
                                <i className="material-icons back">arrow_back</i>
                                <p>Alla produkter</p>
                            </div>

                            <div className="edit-btn horizontal-container">
                                <i className="material-icons">edit</i>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="detail-info-container">
                    <GalleryImage likes={this.state.product.likes}
                                  name={this.state.product.name}
                                  provider={this.state.product.supplier}
                                  p_id={this.state.product.id}
                                  src={this.state.product.image}
                                  alt={this.state.product.name}/>

                    <div className="detail-info-description">
                        <h1 className="hidden-sm hidden-xs">{this.state.product.name}</h1>
                        <p>{this.state.product.description}</p>
                    </div>
                </div>
                <LikeList likes={this.state.product.likes}/>
            </div>
        );
    };
}

export default Detail;
