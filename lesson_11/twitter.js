#!/usr/bin/env node

// test twitter api with following command.
// $curl https://id:pw@stream.twitter.com/1.1/statuses/filter.json?track=psy
// more info? see "https://dev.twitter.com/docs/api/1.1/post/statuses/filter"

var https = require('https');
var mongo = require('mongodb');

var host = '127.0.0.1';
var port = mongo.Connection.DEFAULT_PORT;
var db = new mongo.Db('node-twitter', new mongo.Server(host, port, {}));
var tweetCollection;

var options = {
	host: "stream.twitter.com",
	path: "/1.1/statuses/filter.json?track=psy",
	method: "GET",
	headers: {
		// based on "https://dev.twitter.com/docs/streaming-apis/connecting" doc.
		"Authorization": "Basic " + new Buffer("id:pw").toString('base64')
	}
};

// before start this code, you should start mongodb with following command
// $mongod --dbpath ./dbdata
db.open(function(err) {
	console.log('we are connected : ' + host + ":" + port);

	db.collection('user', function(err, collection) {
		tweetCollection = collection;
	});
});

var request = https.request(options, function(res) {
	var body = '';
	res.on('data', function(chunk) {
		try {
			var tweet = JSON.parse(chunk);
			tweetCollection.insert(tweet, function(err) {
				if (err) {
					console.log('Error : ', err.message);
				} else {
					console.log('inserted');
				}
			});
		} catch (ex) {
			return;
		}
	});
	res.on('end', function() {
		console.log('disconnected');
	})
});

request.end();