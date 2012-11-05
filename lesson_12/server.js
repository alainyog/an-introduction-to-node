#!/usr/bin/env node

var fs      = require('fs');
var express = require('express');
var mongo   = require('mongodb');
var https   = require('https');
var http    = require('http');

var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = config.port;

var dbHost = '127.0.0.1';
var dbPort = mongo.Connection.DEFAULT_PORT;
// db is under the directory '/lesson_11/dbdata/'
var db = new mongo.Db('node-twitter', new mongo.Server(dbHost, dbPort, {}));

var options = {
	host: "stream.twitter.com",
	path: "/1.1/statuses/filter.json?track=psy",
	method: "GET",
	headers: {
		// based on "https://dev.twitter.com/docs/streaming-apis/connecting" doc.
		"Authorization": "Basic " + new Buffer("id:pw").toString('base64')
	}
};

var tweetCollection;

var app = express();
server  = http.createServer(app);
io = require('socket.io').listen(server);

app.get('/', function(req, res) {
	var content = fs.readFileSync('template.html');

	getTweets(function(tweets) {
		var ul = '';
		tweets.forEach(function(tweet) {
			ul += '<li><strong>' + tweet.user.screen_name + '</strong>' + tweet.text + '</li>';
		});
		content = content.toString('utf8').replace('{{INITIAL_TWEETS}}', ul);
		res.setHeader('content-type','text/html');
		res.send(content);
	});
});

server.listen(port, host);

db.open(function(err) {
	console.log('we are connected! ' + dbHost + ':' + dbPort);

	db.collection('user', function(err, collection) {
		tweetCollection = collection;
	});
});

function getTweets(callback) {
	// get last 10 tweets order by descending time.
	tweetCollection.find({}, {'limit':10, 'sort':{'_id':-1}}, function(err, cursor) {
		cursor.toArray(function(err, tweets) {
			console.log(tweets);
			callback(tweets);
		});
	});
};

// requets twitter.com & store to mongodb
var request = https.request(options, function(res) {
	res.on('data', function(chunk) {
		try {
			var tweet = JSON.parse(chunk);
			io.sockets.emit('tweet', tweet);
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