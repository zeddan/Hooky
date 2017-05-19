import React from 'react';
import LoginButton from "../../buttons/LoginButton.jsx";

class HomeHeader extends React.Component {

    render() {
        return (
            <div id="home-header">
                <h1 id="logga">Hooky</h1>
                <div id="home-login-btn-holder">
                    <LoginButton/>
                </div>
            </div>
        );
    }
}

export default HomeHeader;
