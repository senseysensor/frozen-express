'use strict';

var request = require('request');

var baseUrl = process.env.FROZEN_TEST_URL;
if (!baseUrl) {
	throw new Error('Set FROZEN_TEST_URL env variable');
}
if (baseUrl.substr(-1, 1) !== '/') {
	baseUrl += '/';
}

/* global it */

var test = function(name, url, status, options) {
	options = options || {};
	it(name, function(done){
		request(baseUrl + url, function(err, response, body){
			if (err) return done(err);

			if (response.statusCode !== status)
				return done(new Error('code '+response.statusCode+' should be '+status));

			if (options.body && options.body !== body) {
				return done(new Error('body wrong: '+body));
			}

			done();
		});
	});
};


test('replies for / URLs', '', 200, {body:'Welcome'});
test('does not reply for index URLs', 'index', 404);
test('replies for URLs without exceptions', 'about', 200, {body:'About us'});
test('does not reply for URLs with extensions', 'about.html', 404);
test('replies for 404', 'foobar', 404, {body:'My test 404'});
