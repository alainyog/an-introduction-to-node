var fs = require('fs');
console.log('staring');

var content = fs.readFileSync('config.json');
var config = JSON.parse(content);

console.log(config);
console.log(config.username);