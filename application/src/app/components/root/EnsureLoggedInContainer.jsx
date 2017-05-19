import React from 'react';
import Cookies from 'js-cookie';

class EnsureLoggedInContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false}
    }

    componentDidMount() {
        fetch('http://localhost:5000/me', {credentials: 'include'}).then((res) => {
            return res.json();
        }).then((json) => {
            const name = json.user.name;
            const user_id = json.user.id;
            if (user_id === undefined) {
                window.location = '/';
            } else {
{/*<<<<<<< Updated upstream*/}
                Cookies.set('name', name, { expires: 365, path: '/' });
                Cookies.set('user_id', user_id, { expires: 365, path: '/' });
                this.setState({ isLoggedIn: true });
// =======
//                 Cookies.set('user_id', user_id, {expires: 365, path: '/'});
//                 this.setState({isLoggedIn: true});
// >>>>>>> Stashed changes
            }
        });
    }


    render() {
        if (this.state.isLoggedIn) {
            return this.props.children;
        } else {
            return null;
        }
    }

}

export default EnsureLoggedInContainer;
