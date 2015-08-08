var React = require('react');
var Router = require('react-router');

// destructuring assignment
var { RouteHandler, Route, DefaultRoute, Redirect, Link } = Router;
// equivalent to 
// RouteHandler = Router.RouteHandler;
// Route = Router.Route
// etc


var Views = {};
Views.Index = require('./views/index.js');
Views.Layout = require('./views/layout.js');


var routes = (
	<Route>
		<Route handler={ Views.Layout }>
			<Route name="home" path="/" handler={ Views.Index } />
		</Route>
	</Route>
);

module.exports = routes;