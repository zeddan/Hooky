import React from 'react';

//Components
import RegisterButton from '../../buttons/RegisterButton.jsx';
import LinkedinBtn from '../../buttons/LinkedInButton.jsx';
import Footer from './Footer.jsx';
import HomeBanner from "./HomeBanner.jsx";
import HomeHeader from './HomeHeader.jsx';

//Stylesheets
import '../../../css/style.scss';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isLoggedIn: true }
    }

    componentWillMount() {
        fetch('http://localhost:5000/me', {credentials: 'include'}).then((res) => {
            return res.json();
        }).then((json) => {
            if (json.user.id === undefined) {
                this.setState({ isLoggedIn: false });
            } else {
                window.location = '/inspiration';
            }
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return null;
        }
        return (
            <div className="center-text" id="intro-holder">
                <div id="home-header-holder">
                    <HomeHeader/>
                    <HomeBanner/>
                </div>
                <div id="home-content">	 
                    <h3 id="gooddeal">En bra affär för dig och de Skånska bönderna</h3>
                    <h4 id="local">Lokala råvaror är populära och intresset för närproducerat ökar. Hooky visar var produkterna kommer från och berättar historien bakom varje produkt. Varje vecka presenterar vi nya färska matråvaror från utvalda Skånska gårdar. Hooky köper sina varor direkt från utvalda bönder. Genom kollektiva inköp lyckas vi hålla priserna låga. Dessutom tar vi bort mellanhänder så att bönderna slipper onödiga kostnader och så att ni kan få kvalitetsvaror till bättre priser.</h4>
                    <hr/>
                    <h5>Registrera dig och få tillgång till färsk mat och matråvaror av hög kvalitet från hundratals småskaliga verksamheter i Skåne! </h5>
		    
                    <LinkedinBtn/>
                    <RegisterButton/>
                    <hr/>
		    		<Footer/>
                    
                    

                </div>
            </div>
        );
    };
}

export default Home;
