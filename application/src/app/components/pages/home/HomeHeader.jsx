import React from 'react';
import RegisterButton from '../../buttons/RegisterButton.jsx';
import '../../../css/homeHeader.scss';
import LoginButton from "../../buttons/LoginButton.jsx";


class HomeHeader extends React.Component {

    render() {
        return (
            <div id="home-header">
                <h1>HOOKY</h1>
                <div id="home-login-btn-holder">
                    <LoginButton/>
                </div>
            </div>
        );
    }
}

export default HomeHeader;
