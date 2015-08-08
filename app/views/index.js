var React = require('react');

var Index = React.createClass({
	render() {
		console.log("Index view props");
		console.log(this.props);
		return (
			<div>
				this is the index view
			</div>

		);
	}
});

module.exports = Index