import React from 'react';

var {
    IndexLink,
    Link
} = ReactRouter;

class NavBar extends React.Component {
    render() {
        return (
            <div id="header">
                <h1>HOOKY</h1>
                <div id="navigation">
                    <ul className="header">
                        <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                        <li><Link to="/inspiration" activeClassName="active">Inspiration</Link></li>
                        <li><Link to="/about-us" activeClassName="active">About Us</Link></li>
                    </ul>
                    <div id="button-holder">
                        <button type="button" className="nav-btn button secondary" id="log-in-btn">Log In</button>
                        <button type="button" className="nav-btn button" id="register-btn">Register</button>
                    </div>
                </div>
            </div>
        );
    };
}

export default NavBar