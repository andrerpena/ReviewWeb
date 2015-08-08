var React = require('react');


var HomePage = React.createClass({
	render: function() {
		// if (require.auth.credentials !== 'undefined') {
		// 	console.log(require.auth.credentials);
		// 	return(
		// 		<div>
		// 			<p>
		// 				"sup mangg this is logged in Home page"
		// 			</p>
		// 		</div>
		// 	);
		// }
		return(
			<div>
				<p>
					"sup mangg this is the non logged in Home page"
				</p>
			</div>
		);
	}
});

module.exports = HomePage;