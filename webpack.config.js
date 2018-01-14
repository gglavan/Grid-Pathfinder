const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
	entry: './src/App.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				loader: "babel-loader",
				include: [
					path.resolve(__dirname, "src"),
				],
				test: /\.js$/,
				query: {
					plugins: ['transform-runtime'],
					presets: ['es2015'],
				}
			}
		],
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [ 'style-loader', { loader: 'css-loader', options: { minimize: true } } ]
			}
		]
	},
	plugins: [
    new UglifyJsPlugin()
  ]
}

module.exports = config;