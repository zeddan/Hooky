import React from 'react';

//Stylesheets
import "../../../css/aboutUs.scss";

class About extends React.Component {
    render() {
        return (
            
            <div className="center-text">
               <hr id="moveLine"/>             

                <h2>Vi är Hooky!</h2>
                <div id="about-us-holder">
                    <p>Letar ni efter spännande och unika produkter att använda er av på er restaurang eller att sälja i er butik? Då har ni kommit rätt! Vi på Hooky vill inspirera till att använda närproducerat och ekologiskt, men även öppna upp era ögon för unika kvalitetsprodukter, både från svenska och utländska leverantörer.</p>
                    
                    <p>Vi skapar möjligheten för företag att gå samman och göra beställningar till lägsta möjliga pris utan att kompromissa på kvalitet. Vi förhandlar med våra leverantörer och tar hand om er leverans och betalning, så att ni kan spara tid och pengar.</p>
                    
                    <p>Kvalitet är viktigt för oss och vi är säkra att det är viktigt för er också!</p>

                      
                    
                </div>
                <hr/>
            </div>
                        

        );
    }
}

export default About;