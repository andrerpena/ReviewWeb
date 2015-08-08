var React = require('react');


var TestReact = React.createClass({
	render: function() {
		console.log("socket");
		// console.log(request);
		return(
			<div>
				<p>
					"sup mangg"
				</p>
			</div>
		);
	}
});

module.exports = TestReact;