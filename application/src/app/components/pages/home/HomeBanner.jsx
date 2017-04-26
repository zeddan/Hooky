import React from 'react';

//Components

//Stylesheets
import '../../../css/banner.scss';

import '../../../css/banner.scss';

var bannerSrc = "app/components/pages/home/veggie.jpg";

class HomeBanner extends React.Component {

    render() {
        return (
            <div>
                <img src={bannerSrc} alt="happy-eating" id="home-banner-img"/>
                <div className="bannerContentHolder">
                    {/*Använda & istället för och?*/}
                    <h2>Passion för god <br/>kvalitét & bra priser</h2>
                    <p>Tillsammans kan vi inspireras <br/> av bra produkter</p>

                </div>
            </div>
        );
    }
}

export default HomeBanner;
