'use strict';

/*
This file is where webpack picks up everything related to the client side.
The main file that connects the routes/views/styles
*/

let stylesheet = require('./styles/index.less');

let routes = require('./routes.js');
let Router = require('react-router');
let { Handler } = Router;


// http://rackt.github.io/react-router/#Router.run
// http://rackt.github.io/react-router/#HistoryLocation
// Better for looking up URLs 
Router.run(routes, Router.HistoryLocation, function(root, state) {
	// <Handler> --> http://rackt.github.io/react-router/#Route Handler
	// https://facebook.github.io/react/docs/top-level-api.html#react.render
	console.log("styles");
	console.log(stylesheet);
	React.render(<Handler query={ state } path={ state.pathname }/>, document.getElementById('app'))
});
