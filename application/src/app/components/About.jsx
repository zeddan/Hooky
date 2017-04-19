import React from 'react';

export class About extends React.Component {
    render() {
        return (
            <div className="center-text">
                <h1>Vi är Heeky!</h1>
                <div id="about-us-holder">
                    <p>Letar du efter nya spännande produkter till din butik, hotell eller restaurang har du kommit
                        rätt!
                        Här hittar du spännande produkter som inte brukar säljas i vanlig butik.
                        På Hooky kan du få inspiration om nya produkter och dela produkter du tycker om med andra.</p>
                    <p>Vårt kollektivt ordersystem samlar beställningar från fler företag och vi förhandlar bästa priset
                        åt dig.
                        Vi har direkt kontakt med leverantörer och tar hand om betalningen och leveransen så du kan
                        SPARA TID OCH PENGAR.</p>
                    <p> Vi lever för produkter av hög kvalitet.
                        Såväl svenska som utländska leverantörer finns representerade på HOOKY.com men vi lägger stor
                        fokus på lokal odlade och närproducerade varor.</p>
                </div>
            </div>
        );
    }
}


