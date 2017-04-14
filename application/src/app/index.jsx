import Home from './Home.jsx';
import About from './About.jsx';
import App from './App.jsx';


var { Router,
    Route,
    IndexRoute,
    IndexLink,
    hashHistory,
    Link } = ReactRouter;

var destination = document.querySelector("#container");


var Stuff = React.createClass({
    render: function() {
        return (
            <div>
                <h2>STUFF</h2>
                <p>Mauris sem velit, vehicula eget sodales vitae,
                    rhoncus eget sapien:</p>
                <ol>
                    <li>Nulla pulvinar diam</li>
                    <li>Facilisis bibendum</li>
                    <li>Vestibulum vulputate</li>
                    <li>Eget erat</li>
                    <li>Id porttitor</li>
                </ol>
            </div>
        );
    }
});

var Map = React.createClass({
    render: function() {
        return (
            <div>
                <h2>MAP</h2>

                <ol>
                    <li>Nulla pulvinar diam</li>
                    <li>Facilisis bibendum</li>
                    <li>Vestibulum vulputate</li>
                    <li>Eget erat</li>
                    <li>Id porttitor</li>
                </ol>
            </div>
        );
    }
});




ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="stuff" component={Stuff} />
            <Route path="about-us" component={About} />
            <Route path="map" component={Map} />
        </Route>
    </Router>,
    destination
);