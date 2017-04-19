import React from 'react';

import {Link, IndexLink} from "react-router";

export class NavBar extends React.Component {
	login(){
		return $.getJSON('https://randomuser.me/api/')
      			.then((data) => {
        		this.setState({ person: data.results });
      		});	
	}

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
                        <button type="button" onClick={this.login} className="nav-btn button secondary" id="log-in-btn">Log In</button>
                        <button type="button" className="nav-btn button" id="register-btn">Register</button>
                    </div>
                </div>
            </div>
        );
    };
}
