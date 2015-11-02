'use strict';

var path = require('path');
var oassign = require('object-assign');
var Promise = require('pinkie-promise');

function loadRunner(runner) {
	try {
		runner = require(runner);
	} catch (e) {
		throw new Error('Webpacking needs to install webpack, webpack-dev-server packages');
	}
	return runner;
}

function loadConfig(file, opts) {
	var configs = {};
	if (/(.js|.json)$/.test(file)) {
		var loaded = require(path.resolve(path.join(process.cwd(), file)));
		opts.configs.forEach(function (t) {
			oassign(configs, loaded[t]);
		});
	} else {
		throw new Error('Webpacking does not support those of file types');
	}
	return configs;
}

function getError(stats) {
	// Extract first error
	stats = stats.toJson();
	var info = stats.errors[0].split('\n');
	return new Error(info[1], info[0]);
}

var WebpackRunner = {};

WebpackRunner.server = function (configs, cb) {
	var Server = loadRunner('webpack-dev-server');
	var webpack = loadRunner('webpack');

	if (!configs.devServer || !configs.devServer.port) {
		throw new Error('devServer, devServer port need to be required');
	}

	new Server(webpack(configs), configs.devServer).listen(8000, cb);
};

WebpackRunner.compile = function (configs, cb) {
	var webpack = loadRunner('webpack');
	var compiler = webpack(configs);

	compiler.run(function (err, stats) {
		console.log(stats.toString({
			colors: true
		}));
		
		cb(err || (stats.hasErrors() ? getError(stats) : null));
	});
};

module.exports = function (runner, file, opts, cb) {
	cb = cb || function () {};

	// Read configs and merge with additional options
	var configs = loadConfig(file, opts);

	// Pickup runner and run for webpack
	var webpackRunner = WebpackRunner[runner];

	if (!webpackRunner) {
		throw new Error('Webpacking does not allow executing of unknown command');
	}

	return new Promise(function (resolve, reject) {
		webpackRunner(configs, function (err) {
			if (!err) {
				resolve();
			} else {
				reject(err);
			}
		});
	});
};
