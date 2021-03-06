'use strict';

var frozen = require('..');
var util = require('./lib/util.js');

var test = util.test(frozen);

util.it('should detect a route by itself', function(express, done){
	test(express, done)
		.route('/hello', 'hello.html', 'Hello world!')
		.run({
			urls: null
		});
});

util.it('should detect multiple routes by itself', function(express, done){
	test(express, done)
		.route('/hello', 'hello.html', 'Hello world!')
		.route('/', 'index.html', 'Welcome!')
		.route('/goodbye', 'goodbye.html', 'Goodbye!')
		.run({
			urls: null
		});
});

util.it('should encode URIs', function(express, done){
	test(express, done)
		.route('/:path', 'hello ąčę.html', 'Hello world!')
		.run({
			urls: ['/hello ąčę']
		});
});
