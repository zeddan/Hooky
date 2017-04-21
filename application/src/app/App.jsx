import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory, IndexRoute} from "react-router";

import {Root} from "./components/root/Root.jsx";
import {Home} from "./components/pages/home/Home.jsx";

class App extends React.Component {
	render() {
        return(
          <Router history={browserHistory}>
                <Route path="/" component={Root}>
                    <IndexRoute component={Home}/>
                </Route>
           </Router>
        );
  }
}

render(<App/>, window.document.getElementById("app"));

