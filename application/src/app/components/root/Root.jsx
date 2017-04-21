import React from 'react';

//Components
import NavBar from './NavBar.jsx';

//Stylesheets
import '../../css/style.scss';

class Root extends React.Component{
    render() {
        return (
           <div>
                <NavBar/>
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Root;
