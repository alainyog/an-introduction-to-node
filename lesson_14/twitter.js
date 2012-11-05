var keyword  = process.argv[2];
var username = process.argv[3];
var password = process.argv[4];

var tweetCount = 0;
setInterval(function() {
	// process.send(tweetCount + ' tweets');
}, 2000);

var https = require('https');
var options = {
	host: "stream.twitter.com",
	path: "/1.1/statuses/filter.json?track=" + keyword,
	method: "GET",
	headers: {
		// based on "https://dev.twitter.com/docs/streaming-apis/connecting" doc.
		"Authorization": "Basic " + new Buffer(username + ":" + password).toString('base64')
	}
};

var request = https.request(options, function(res) {
	res.on('data', function(chunk) {
		var tweet = JSON.parse(chunk);
		console.log(tweet);
		tweetCount++;
	})
});

request.end();