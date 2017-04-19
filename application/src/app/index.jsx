import React from "react";
import { render } from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Root} from "./components/Root.jsx";
import {Home} from "./components/Home.jsx";
import {About} from "./components/About.jsx";

class App extends React.Component {
	render() {
        return(
          <Router history={browserHistory}>
                <Route path="/" component={Root}>
                    <IndexRoute component={Home}/>
                    <Route path="about-us" component={About} />
                </Route>
           </Router>
        );
  }
}

render(<App/>, window.document.getElementById("app"));




