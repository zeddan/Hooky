import React from "react";
import {Button} from "react-bootstrap";
import "../../../css/startPage.scss";
import RegisterButton from '../../buttons/RegisterButton.jsx';
import LinkedinBtn from '../../buttons/LinkedInButton.jsx';
import StartHeader from './HomeBanner.jsx';
import Info from './Info.jsx';
import About from './About.jsx';

export class Home extends React.Component {
    render() {
        return (
           <div className="center-text" id="intro-holder">

                <div className="intro" id="intro-1">
                    <StartHeader/>
                    <h2>Hooker!!!</h2>
                    <h3>Inköpskollektiv för företag</h3>
                </div>
		<div className="intro">
		<h3>Gör era företagsköp tillsammans med andra och spara upp till 40%</h3>
		<Info/>
		</div>
                <div className="intro" id="intro-2">
		<About/>
                </div>
                <div className="intro" id="intro-3">
                    <h3>Registrera dig gratis och bli en del av vår inköpscommunity</h3>
                    <div id="register-option">
                        <RegisterButton/>
                        <LinkedinBtn/>
			<button className="button">Google</button>
                    </div>
                </div>
            </div>
        );
    };

}


