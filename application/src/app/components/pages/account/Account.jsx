import React from 'react';
import '../../../css/account.scss';
import {Button} from 'react-bootstrap';

class Account extends React.Component {

    render() {
        return (
            <div>
                <div id="account-info">
                    <h1>Min Profil</h1>
                    <hr/>
                    <h2>Företagsnamn: Djäkne AB</h2>
                    <h2>Email: info@djakne.se</h2>
                </div>
                <div id="account-button-panel">
                    <Button bsStyle="primary">
                        Ändra uppgifter
                    </Button>
                    <Button bsStyle="primary">
                        Logga ut
                    </Button>
                </div>
            </div>

        )
    }
}

export default Account;