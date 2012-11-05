#!/usr/bin/env node

var https = require('https');
var pjson = require('prettyjson');

function getRepos(username, callback) {
	var options = {
		host:'api.github.com',
		path:'/users/' + username + '/repos',
		method:'GET'
	};

	var request = https.request(options, function(res) {
		var body = '';

		res.on('data', function(chunk) {
			body += chunk.toString('utf8');
		});

		res.on('end', function() {
			var repos = [];
			var json = JSON.parse(body);
			json.forEach(function(repo) {
				repos.push({
					name:repo.name,
					desc:repo.description
				});
			});

			callback(repos);
		});
	});

	request.end();
};

getRepos('chitacan', function(repos) {
	console.log(pjson.render(repos));
});