import React from 'react';

//Components
import RegisterButton from '../../buttons/RegisterButton.jsx';
import LinkedInBtn from "../../buttons/LinkedInButton.jsx";

//Stylesheets
import '../../../css/startHeader.scss';

var bannerSrc = "http://www.visitwaterfalls.com/wp-content/uploads/2012/09/fine-dining-header.jpg";
class Header extends React.Component {
    render() {
        return (
            <div>
                <img src={bannerSrc} alt="happy-eating"/>
                <div className="bannerContentHolder">
                    <h1>Passion för god kvalitet och bra priser</h1>
                    <h2>Tillsammans kan vi inspireras av bra produkter</h2>
                    <div id="button-holder">
                        <LinkedInBtn/>
                        <RegisterButton />
                    </div>
                </div>
                <h2></h2>
            </div>
        );
    }
}

export default Header;
