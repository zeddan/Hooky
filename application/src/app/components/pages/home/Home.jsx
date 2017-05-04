import React from 'react';

//Components
import {Button, Col} from 'react-bootstrap';
import RegisterButton from '../../buttons/RegisterButton.jsx';
import LinkedinBtn from '../../buttons/LinkedInButton.jsx';
import ProductButton from '../../buttons/ProductButton.jsx';
import Info from './Info.jsx';
import About from './About.jsx';
import HomeBanner from "./HomeBanner.jsx";
import HomeHeader from './HomeHeader.jsx';

//Stylesheets
import '../../../css/startPage.scss';

class Home extends React.Component {
    render() {
        return (
            <div className="center-text" id="intro-holder">
                <div id="home-header-holder">
                    <HomeHeader/>
                    <HomeBanner/>
                </div>
                <div id="home-content">
                    {/*Måste nog skriva upp till 40%*/}
	 	    
                    <h2>Gör era företagsköp tillsammans & spara 40%</h2>
                    <hr/>
                    <h3>Bli medlem gratis</h3>
		    
                    <LinkedinBtn/>

                    <RegisterButton/>
                    <hr/>
		    
                    <Info/>
                    <About/>
                    <h2>Tillsammans kan vi spara pengar utan att kompromissa på kvalitét</h2>
                    <hr/>
                    <h3>Bli medlem gratis</h3>
		   
                    <LinkedinBtn/>
                    <RegisterButton/>
                </div>
            </div>
        );
    };
}

export default Home;
