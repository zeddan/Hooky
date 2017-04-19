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
