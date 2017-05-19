import React from 'react';

class EnsureAdminLoggedInContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isAdmin: false}
    }

    componentDidMount() {
        fetch('http://localhost:5000/me', {credentials: 'include'}).then((res) => {
            return res.json();
        }).then((json) => {
            console.log(json);
            if (json.user.admin == true) {
                this.setState({isAdmin: true});
            } else {
                window.location = '/';
            }
        });
    }


    render() {
        if (this.state.isAdmin) {
            return this.props.children;
        } else {
            return null;
        }
    }

}

export default EnsureAdminLoggedInContainer;
