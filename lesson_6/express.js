#!/usr/bin/env node

var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = config.port;

var express = require('express');
var app     = express();

app.use(app.router);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.send('hello');
});

app.get('/hello/:text', function(req, res) {
	res.send('hello ' + req.params.text + '!!');
});

app.get('/user/:id', function(req, res) {
	var user = users[req.params.id];
	if (user) {
		res.send("<a href='http://twitter.com/" + user.twitter+"'>Follow " + user.name + " on twitter</a>");
	} else {
		res.send("Sorry! We can't find the user :(", 404);
	}
});

app.listen(port, host);

var users = {
	"1":{
		"name":"Kyung Yeol Kim",
		"twitter":"chitacan"
	},
	"2":{
		"name":"Jeffrey Way",
		"twitter":"jeffrey_way"
	}
};