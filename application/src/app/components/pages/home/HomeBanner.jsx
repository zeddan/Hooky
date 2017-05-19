import React from 'react';

//Components

//Stylesheets
import '../../../css/style.scss';

var bannerSrc = "app/components/pages/home/morot.jpg";
var bannerSrc = "app/components/pages/home/veggie.jpg";

class HomeBanner extends React.Component {

    render() {
        return (
            <div>
                <img src={bannerSrc} alt="happy-eating" id="home-banner-img"/>
                <div className="bannerContentHolder">
                    {/*Använda & istället för och?*/}
                    <h2 id="headerlocal">Lokala och <br/>förstklassiga råvaror</h2>
                    <p>Direkt från Skånska gårdar</p>

                </div>
            </div>
        );
    }
}

export default HomeBanner;
