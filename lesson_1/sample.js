var fs = require('fs');

console.log('starting');
fs.readFile('sample.txt', function(err, data) {
	console.log("" + data);
});
console.log('excuting');