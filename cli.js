#!/usr/bin/env node
'use strict';
var meow = require('meow');
var webpacking = require('./');

var cli = meow({
	help: [
		'Usage',
		'  webpacking [runner] [input] [options]',
		'',
		'Options',
		'  --configs: the names of configures. should be passed with `,` and no-space',
		'',
		'Examples',
		'  $ webpacking compile ./webpack.config.js --configs=modules,app',
		'  $ webpacking server ./webpack.config.js --configs=modules,server'
	]
});

if (cli.input.length < 2 || !cli.flags.configs) {
	console.log(cli.help);
	process.exit(-1);
}

webpacking(cli.input[0], cli.input[1], {
	configs: cli.flags.configs.split(',')
});
