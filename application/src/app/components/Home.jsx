import React from "react";
import {Button} from "react-bootstrap";
import "../css/startPage.css";

export class Home extends React.Component {
    render() {
        return (
           <div className="center-text" id="intro-holder">
                <div className="intro" id="intro-1">
                    <h3>Inköpskollektiv för företag</h3>
                    <p>Gör dina företagsinköp tillsammans med andra.</p>
                    <p>Spara upp till 40% och hitta nya spännande produkter</p>
                </div>
                <div className="intro" id="intro-2">
                    <p>Större order = Bättre förhandlingsläge = Lägre priser!</p>
                    <p>Vi gör jobbet åt dig!</p>
                </div>
                <div className="intro" id="intro-3">
                    <h3>Registrera dig gratis och bli en del av vår inköpscommunity</h3>
                    <div id="register-option">
                        <button className="button">Email</button>
                        <button className="button">LinkedIn</button>
                        <button className="button">Google</button>
                    </div>
                </div>
            </div>
        );
    };

}


