'use strict';
var assert = require('assert');
var webpacking = require('./');

it('should returns anything', function (done) {
	webpacking('compile', './fixtures/webpack.config.js', {
		configs: [
			'app',
			'modules'
		]
	}).then(function () {
		assert.ok(true);
		done();
	});
});

it('should returns an error', function (done) {
	webpacking('compile', './fixtures/webpack.config-error.js', {
		configs: [
			'app',
			'modules'
		]
	}).then(function () {
		assert.ok(false);
		done();
	}, function () {
		assert.ok(true);
		done();
	});
});

it('should returns no error from server', function (done) {
	webpacking('server', './fixtures/webpack.config.js', {
		configs: [
			'server',
			'modules'
		]
	}).then(function () {
		assert.ok(true);
		done();
	});
});
