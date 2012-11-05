#!/usr/bin/env node

var mongo = require('mongodb');

var host = '127.0.0.1';
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-introduction', new mongo.Server(host, port, {}));

function getUser(id, callback) {
	db.open(function(err) {
		console.log('we are connected : ' + host + ":" + port);

		db.collection('user', function(err, collection) {
			console.log('we have collection');

			// before start this code, you should start mongodb with following command
			// "mongod --dbpath ./dbdata"

			// collection.insert({
			// 	id:"1",
			// 	name:"kyung yeol kim",
			// 	twitter:"chitacan",
			// 	email:"chitacan@gmail.com"
			// }, function() {
			// 	console.log('successfully inserted kyung yeol kim');
			// });

			// collection.insert({
			// 	id:"2",
			// 	name:"joe",
			// 	twitter:"joeblogs",
			// 	email:"joe@gmail.com"
			// }, function() {
			// 	console.log('successfully inserted joe');
			// });

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

getUser(1, function(user) {
	if (user) {
		console.log('we found a user ',user);
	} else {
		console.log('no user found with given id');
	}
});
