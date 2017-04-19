<<<<<<< HEAD
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




=======
import Home from './Home.jsx';
import About from './About.jsx';
import App from './App.jsx';
import Inspiration from './Inspiration.jsx';


var { Router,
    Route,
    IndexRoute,
    IndexLink,
    hashHistory,
    Link } = ReactRouter;

var destination = document.querySelector("#container");

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="inspiration" component={Inspiration} />
            <Route path="about-us" component={About} />
        </Route>
    </Router>,
    destination
);
>>>>>>> ee7cf225e7d2207e74f17d0c48af0734669cb305
