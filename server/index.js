var Fs = require('fs');

var Config = require('../config.json');
var routes = require('../app/routes.js');
var HTMLBASE = Fs.readFileSync(__dirname + '/../public/index.html').toString();

var Hapi = require('hapi');
var Router = require('react-router');
var React = require('react');
var Cheerio = require('cheerio');
var Bell = require('bell');
var hapiAuthCookie = require('hapi-auth-cookie');


var server = new Hapi.Server();

server.connection({
	host: 'localhost',
	port: 8000
});

// // http://hapijs.com/api#serverregisterplugins-options-callback
// server.register([Bell, hapiAuthCookie], function(err) {
// 	if (err) {
// 		console.log('plugin registration error');
// 		console.error(err);
// 		return process.exit(1);
// 	}

// 	var hapiAuthCookieOptions = {
//         password: 'cookie-encryption-password', // Password used for encryption
//         cookie: 'reviewweb-auth', // Name of cookie to set
//         isSecure: false
//     };

//     // http://www.sitepoint.com/oauth-integration-using-hapi/#code-explanation
//     // http://hapijs.com/api#serverauthstrategyname-scheme-mode-options

//     // The scheme name is the second parameter to server.auth.strategy. The scheme 
//     // has to be registered with a hapi server before registering strategies that use it. 
//     // That is why we need to register the plugins first, and then set 
//     // up strategies via server.auth.strategy.

//     // strategy uses 'bell' scheme
//     // authCookieOptions - scheme options based on scheme requirements
//     //					{'strateg-name', 'scheme-name', options}
//     server.auth.strategy('reviewweb-cookie', 'cookie', hapiAuthCookieOptions);


//     var bellAuthOptions = {
//         provider: 'github',
//         password: 'github-encryption-password', //Password used for encryption
//         clientId: '***',//'YourAppId',
//         clientSecret: '***',//'YourAppSecret',
//         isSecure: false
//     };

//     server.auth.strategy('github-oauth', 'bell', bellAuthOptions);

//     // http://hapijs.com/api#serverauthdefaultoptions
//     server.auth.default('reviewweb-cookie');

// });

// // Routes
// server.route([
// 	{
// 		// Reach out to GitHub, ask the user for permission for their information
//         // if granted, response with their name
// 		method: 'GET',
// 		path: '/login',
// 		// config -  additional route options
// 		// http://hapijs.com/api#route-configuration
// 		// handler - the function called to generate the response after successful authentication and validation
// 		// http://hapijs.com/api#route-handler
// 		// request object in the 'request' parameter
// 		// http://hapijs.com/api#request-object

// 		// request --> route --> handler --> Route Handler -->
// 		config: {
// 			// tells hapi to use github-oauth strategy when trying to authenticate this route
// 			// if omitted, hapi will use the default strategy
// 			// http://hapijs.com/api#route-options
// 			auth: 'github-oauth',
// 			handler: function(request, reply) {
// 				console.log('login');
// 				// handler function will check the request.auth.isAuthenticated value of the request.
// 				// request.auth is added to request only on routes that have authentication enabled
// 				// hapi-auth-cookie added a session object to request.auth
//                 if (request.auth.isAuthenticated) {
//                 	console.log('login authenticated');
//                 	// Now the user has been authenticated with GitHub, create a session cookie to use
//                 	// throughout the application with request.auth.session.set and pass in credentials object returned from GitHub
//                 	console.log(request.auth);
//                 	request.auth.session.set(request.auth.credentials);
//                 	// return reply('Hello ' + request.auth.credentials.profile.display);
//                 	return reply.redirect('/');
//                 }
//                 // if not authenticated
//                 reply('Not logged in ....').code(401);
// 			}
// 		}
// 	},
// 	{
// 		// Show the account information if the have logged in already
//         // otherwise, send a 491
// 		method: 'GET',
// 		path: '/account',
// 		config: {
// 			// because we don't override any of the auth values in the config object,
// 			// this route uses the default cookie strategy.
// 			// When the /account route is requests, hapi will look for teh default cookie strategy and makes sure it exists 
// 			// and is a valid cookie for this request.
// 			// If it is, the handler will be called. Else, 401 error
// 			auth: 'github-oauth',
// 			handler: function(request, reply) {
// 				console.log('account');
// 				if (reply) {
// 					console.log('not logged in');
// 					reply.redirect('/login');
// 				}
// 				return reply(request.auth.credentials.profile);
// 			}
// 		}
// 	},
// 	{
// 		// If the user is authenticated reply with their user name
//         // otherwise, replay back with a generic message.
// 		method: 'GET',
//         path: '/',
//         config: {
//         	auth: {
//         		// required, optional, try
//         		mode: 'optional'
//         	},
//             handler: function(request, reply) {
//             	console.log('/ (home)');
//                 if (request.auth.isAuthenticated) {
//                 	console.log('authenticated');
//                 	return reply('Welcome back ' + request.quth.credentials.profile);
//                 }
//                 reply('Hello Stranger!');
//             }
//         }
// 	},
// 	{
// 		// Clear the session information
// 		method: 'GET',
//         path: '/logout',
//         config: {
//         	auth: false,
//             handler: function(request, reply) {
//             	console.log('logout');
//             	console.log('Before request clear');
//             	console.log(request.auth);
//             	request.auth.session.clear();
//             	console.log('after request clear');
//             	console.log(request.auth);
//                 reply.redirect('/');
//             }
//         }
// 	}
// ])


// server.register(Bell, function(err) {
// 	server.auth.strategy('twitter', 'bell', {
// 		provider: 'twitter',
// 		password: 'password',
// 		isSecure: false,
// 		clientId: Config.twitter.clientId,
// 		clientSecret: Config.twitter.clientSecret
// 	});
// });

// server.route({
// 	method: '*',
// 	path: '/login',
// 	config: {
// 		auth: 'twitter',
// 		handler: function(request, reply) {
// 			console.log(request.auth.credentials);
// 			// reply('<pre>' + JSON.stringify(request.auth.credentials, null, 4) + '</pre>');
// 			reply.redirect('/');
// 		}
// 	}
// });

// http://hapijs.com/api#serverextevent-method-options
// server.ext catches all other routes
server.ext('onPreResponse', function(request, reply) {
	// onPreResponse - always called

	if (typeof request.response.statusCode !== 'undefined') {
        // console.log('statusCode != undefined', request.path)
        console.log('Found server path');
        return reply.continue();
    }
    
    console.log(request.response.statusCode);
	console.log('rendering server side react', request.path)

	Router.run(routes, request.path, function(Handler, router) {
		// router.query = request.url.query;

		// console.log(request);
		// console.log("router.query");
		// console.log(router.query);
		var html = React.renderToStaticMarkup(<Handler />);
		// http://cheeriojs.github.io/cheerio/

		// Server knows HTML with Cheerio
		var $ = Cheerio.load(HTMLBASE);
		// http://cheeriojs.github.io/cheerio/#manipulation
		// prepend inserts content as the first child of each of the selected elements.
		$('#app').prepend(html);
		// convert to html
		var output = $.html();
		reply(output);
	});

});

server.start(function() {
	console.info("==> ✅  Server is listening");
    console.info("==> 🌎  Go to " + server.info.uri.toLowerCase());
});