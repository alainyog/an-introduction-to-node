#!/usr/bin/env node

var http = require('http');
var fs   = require('fs');

// read config.json
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = config.port;

var server = http.createServer(function(req, res) {
	console.log('Received request : ' + req.url);
	fs.readFile('./public' + req.url, function(err, data) {
		if (err) {
			res.writeHead(404, {"Content-type":"text/plain"});
			res.end('Sorry!! the page was not found');
		} else {
			res.writeHead(200, {"Content-type":"text/html"});
			res.end(data);
		}
	});
});

server.listen(port, host, function() {
	console.log('Listening on ' + host + ':' + port);
});

fs.watch('config.json', function() {
	config = JSON.parse(fs.readFileSync('config.json'));

	host = config.host;
	port = config.port;

	server.close();
	server.listen(port, host, function() {
		console.log('Now Listening on ' + host + ':' + port);
	});
});