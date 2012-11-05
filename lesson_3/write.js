var fs = require('fs');

console.log('starting');
fs.writeFile('write_test.txt', "hello world sync", function(err){
	console.log("written file");
});
console.log('finished');