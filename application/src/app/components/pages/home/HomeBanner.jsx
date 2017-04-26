import React from 'react';

//Components

//Stylesheets
import '../../../css/banner.scss';

import '../../../css/banner.scss';

var bannerSrc = "https://www.svtstatic.se/image-cms/svtse/1484746920/gokvall/recept/article9550302.svt/alternates/extralarge/dsc7751-jpg";

class HomeBanner extends React.Component {

    render() {
        return (
            <div>
                <img src={bannerSrc} alt="happy-eating"/>
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
