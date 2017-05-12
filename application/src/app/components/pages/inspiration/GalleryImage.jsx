import React from 'react';

import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class GalleryImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            likes: this.props.likes,
            name: this.props.name,
            provider: this.props.provider,
            shadow: 1,

        };
        console.log("Gallery Image likes: " + this.state.likes);
        this.like = this.like.bind(this);
    };

    onMouseOver = () => this.setState({ shadow: 3 });
		onMouseOut = () => this.setState({ shadow: 1 });

    render() {
        return (
          <MuiThemeProvider>
            <Paper className='gallery-card' zDepth={this.state.shadow} onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}>
                <div className='bg'></div>
                <div className='info'>
                    <div className='name'>{this.state.name}</div>
                    <div className='provider'>{this.state.provider}</div>
                    <div className='like-heart'
                         onClick={() => this.like()}>
                        <div className='likes'>{this.state.likes.length}</div>
                        <i className="heart fa fa-heart-o" aria-hidden="true"></i>
                    </div>
                </div>
                <img className='gallery-thumbnail'
                     src={this.props.src}
                     onClick={this.props.handleClick}
                     alt={this.props.alt}/>
                 </Paper>
            </MuiThemeProvider>
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
