import React from 'react';
import '../../../css/account.scss';
import {Button} from 'react-bootstrap';
import Cookies from 'js-cookie';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Djäkne',
            email: 'info@djakne.se'
        };
        this.logout = this.logout.bind(this);
    };

    componentDidMount() {
        fetch('http://localhost:5000/me', {credentials: 'include'}).then((res) => {
          return res.json();
        }).then((json) => {
          if (json.user.email != undefined) {
            this.setState({name: json.user.name, email: json.user.email});
          }
        });
    };

    render() {
        return (
            <div>
                <div id="account-info">
                    <h1>Min Profil</h1>
                    <hr/>
                    <h2>Namn: {this.state.name}</h2>
                    <h2>Email: {this.state.email}</h2>
                </div>
                <div id="account-button-panel">
                    <Button bsStyle="primary">
                        Ändra uppgifter
                    </Button>
                    <Button onClick={() => this.logout()} bsStyle="primary">
                        Logga ut
                    </Button>
                </div>
            </div>
        )
    }

    logout() {
        fetch('http://localhost:5000/logout', {credentials: 'include'}).then((res) => {
            return res.json();
        }).then((json) => {
            Cookies.remove('name', {path: '/'});
            Cookies.remove('user_id', {path: '/'});
            window.location = '/';
        });
    }
}

export default Account;
