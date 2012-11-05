var fs = require('fs');
console.log('started');
var config = JSON.parse(fs.readFileSync('config.json'));
console.log(config);

fs.watchFile('config.json', function(current, previous){
	console.log('curret mtime : ' + current.mtime);
	console.log('pervious mtime : ' + previous.mtime);
});