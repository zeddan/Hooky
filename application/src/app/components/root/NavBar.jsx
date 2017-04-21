import React from 'react';
import LoginButton from '../buttons/LoginButton.jsx';
import {Link, IndexLink} from "react-router";
import "../../css/navigationBar.scss";

class NavBar extends React.Component {
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
			<LoginButton/>
                    </div>
                </div>
            </div>
        );
    };
}

export default NavBar;
