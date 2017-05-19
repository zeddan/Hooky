import React from 'react';

//Components
import NavigationBar from './NavigationBar.jsx';

//Stylesheets
import '../../css/style.scss';

class Root extends React.Component {
  render() {
    var showNav = this.props.location.pathname !== '/';
    return (
      <div>
        {showNav && <NavigationBar />}
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Root;
