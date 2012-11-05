var fs = require('fs');
console.log('starting');
var content = fs.readFileSync('sample.txt');
console.log('contents : ' + content);
console.log('carry on excuting');