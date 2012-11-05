#!/usr/bin/env node

var childProcess = require('child_process');

var children = [];

var keywords = [
	['bieber', 'your 1st id', 'your 2nd pw'],
	['psy',    'your 2nd id', 'your 2nd pw']
];

keywords.forEach(function(keyword) {
	var child = childProcess.fork(__dirname + '/twitter.js', keyword);
	child.on('exit', function() {
		console.log(keyword[0] + ' : died :(');
	});
	child.on('message', function(text) {
		console.log(keyword[0] + ' : ' + text);
	});
	children.push(child);
});

process.on('exit', function() {
	children.forEach(function(child) {
		child.kill();
	})
})