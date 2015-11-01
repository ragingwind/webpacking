'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
	modules: {
		module: {
		  loaders: [{
		    test: /\.jsx?$/,
		    exclude: /node_modules/,
		    loaders: ['babel-wrong-loader']
		  }]
		}
	},
	app: {
		entry: path.resolve(__dirname, 'app.coffee'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist/',
      filename: 'app.js',
      library: 'ReactPhotonKit',
      libraryTarget: 'umd'
    },
    externals: [
      'react',
      'react-dom'
    ]
	}};
