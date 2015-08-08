var React = require('react');
var { RouteHandler } = require('react-router');

// var LogoElement = React.createClass({
// 	render() {
// 		return (
// 		);
// 	}
// });

// var CenterPiece = React.createClass({
// 	render() {
// 		return (
// 		);
// 	}
// });

// var IsLoggedIn

var UserMenu = React.createClass({

	render() {
		return (
			<div>
				<div id="login-btn">
					<a href="/login">
						<button className="btn btn-embossed btn-primary">Login</button>
					</a>
				</div>
				<div id="signup-btn">
					<a href="/signup">
						<button className="btn btn-embossed btn-primary">Sign up</button>
					</a>
				</div>
			</div>
		);
	}
})

var Layout = React.createClass({
	render() {
		console.log("layout props");
		console.log(this.props);
		return (
			<div id="review-web">
				<header className="header">
					<UserMenu />
				</header>
				<div>
					<RouteHandler path={ this.props.path } />
				</div>
			</div>
		)
	}
});

module.exports = Layout;