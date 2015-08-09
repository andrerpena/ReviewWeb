var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: [
		'./app/index.js'
	],
	output: {
		path: './public/js',
        filename: 'main.js'
	},
	devtool: 'source-map',
	debug: true,
	module: {
		loaders: [
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.jsx$/, loader: 'jsx-loader' },
			// http://babeljs.io/docs/usage/runtime/
			{ test: /\.es6$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime'},
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?stage=0&optional=runtime'},
			{ test: /\.less$/, exclude: /node_modules/, loader: 'style!css!less'},
			// { test: /\.less$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader") }
			// { test: /\.css/, exclude: /node_modules/, loader: 'style-loader!css-loader'}
		],
		plugins: [
			// https://github.com/webpack/extract-text-webpack-plugin#usage-example-with-css
			// new ExtractTextPlugin('style.css', {
			// 	allChunks: true
			// })
		]
	}
};