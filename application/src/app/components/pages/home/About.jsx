import React from 'react';

//Stylesheets
import "../../../css/aboutUs.scss";

class About extends React.Component {
    render() {
        return (
            
            <div className="center-text">

                <h2>Hooky = Win Win <br/>för dig + bönderna</h2>
                <div id="about-us-holder">

                    <p>Hooky köper sina varor direkt från utvalda bönder. Genom kollektivt inköp tillsammans med andra lyckas vi hålla priserna låga. Dessutom tar vi bort mellanhänder så att du kan få för kvalitetsvaror till bättre priser och bönderna mer betalt för sina produkter.
                    </p>
                </div>
                <hr/>
            </div>
                        

        );
    }
}

export default About;