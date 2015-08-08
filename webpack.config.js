var webpack = require('webpack');

module.exports = {
	entry: [
		'./app/index.es6'
	],
	output: {
		path: './public/js',
        filename: 'main.js'
	},
	devtool: 'source-map',
	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.jsx$/, loader: 'jsx-loader' },
			// http://babeljs.io/docs/usage/runtime/
			{ test: /\.es6$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime'},
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime'}
		]
	}
};