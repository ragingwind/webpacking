# webpacking [![Build Status](https://travis-ci.org/ragingwind/webpacking.svg?branch=master)](https://travis-ci.org/ragingwind/webpacking)

> webpack-ing, run webpack or webpack-dev-server with pickable custom configure

Help you to manage many of multiple verbose web configs through a custom config file

## Install

```
$ npm install --save webpacking
```


## Usage

```js
var webpacking = require('webpacking');

webpacking('compile', './fixtures/webpack.config.js', {
	configs: [
		'app',
		'modules'
	]
}).then(function (err) {
	done();
});
```


## API

### webpacking(runner, configs, [options])

#### runner

Type: `string`

webpack runner type what you want to run.

- `compile`: bundle by `webpack`
- `server`: run server with `webpack-dev-server`

#### configs

Type: `string`

path for custom webpack configure file. see below sample and tests for more information.

```js
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
		}
		...
	},
	server: {
		entry: path.resolve(__dirname, 'app.coffee'),
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: 'dist/',
			filename: 'app.js'
		}
		...
	}
};
```
#### options

##### configs

the names of configures you want to set up for webpack

## CLI

```sh
$ npm install --global webpacking
```

```sh
$ webpacking --help

Usage
webpacking [runner] [input] [options]

Options
--configs: the names of configures. should be passed with `,` and no-space

Examples
	$ webpacking compile ./webpack.config.js --configs=modules,app
	$ webpacking server ./webpack.config.js --configs=modules,server
```


## License

MIT © [ragingwind](http://ragingwind.me)
