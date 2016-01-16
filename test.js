'use strict';

import test from 'ava';
import webpacking from './';

test('should returns anything', t => {
	return webpacking('compile', './fixtures/webpack.config.js', {
		configs: [
			'app',
			'modules'
		]
	}).then(function () {
		t.ok(true);
	});
});

test('should returns an error', t => {
	webpacking('compile', './fixtures/webpack.config-error.js', {
		configs: [
			'app',
			'modules'
		]
	}).then(function () {
		t.ok(false);
	}, function () {
		t.ok(true);
	});
});

test('should returns no error from server', t => {
	webpacking('server', './fixtures/webpack.config.js', {
		configs: [
			'server',
			'modules'
		]
	}).then(function () {
		t.ok(true);
	});
});
