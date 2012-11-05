#!/usr/bin/env node

function hello() {
	return 'hello'
}

function helloworld() {
	return hello() + ' world';
}

module.exports.hello = hello;
module.exports.helloworld = helloworld;