#!/usr/bin/env node

var mongo   = require('mongodb');
var express = require('express');

var app = express();

var host = '127.0.0.1';
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-introduction', new mongo.Server(host, port, {}));

function getUser(id, callback) {
	db.open(function(err) {
		console.log('we are connected : ' + host + ":" + port);

		db.collection('user', function(err, collection) {
			console.log('we have collection');

			collection.find({"id":id.toString()}, function(err, cursor) {
				cursor.toArray(function(err, users) {
					if (users.length == 0) {
						callback(false);
					} else {
						callback(users[0]);
					}
				});
			});
		});
	});
};

app.get('/', function(req, res) {
	res.send('hello this is mongodb');
});

app.get('/user/:id', function(req, res) {
	getUser(req.params.id, function() {
		if (user) {
			console.log('we found a user ',user);
		} else {
			res.send("user does not exist", 404);
		}
	});
});