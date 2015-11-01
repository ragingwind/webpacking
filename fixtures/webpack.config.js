'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
	modules: {
		module: {
		  loaders: [{
		    test: /\.jsx?$/,
		    exclude: /node_modules/,
		    loaders: ['babel-loader']
		  }, {
		    test: /\.coffee$/,
		    exclude: /node_modules/,
		    loader: 'coffee-loader'
		  }, {
		    test: /\.cjsx$/,
		    exclude: /node_modules/,
		    loaders: ['coffee', 'cjsx']
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
	},
	server: {
		entry: path.resolve(__dirname, 'app.coffee'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'dist/',
      filename: 'app.js'
    },
    devServer: {
      contentBase: "./dist",
      port: 8000,
      stats: {
			  colors: true
		  },
      publicPath: '/dist/',
    },
    resolveLoader: {
      modulesDirectories: [
        path.resolve('node_modules')
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    externals: [
      'react',
      'react-dom'
    ]
	}
};
