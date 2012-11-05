#!/usr/bin/env node

var fs = require('fs');

var SOURCE    = 1,
	DIRECTORY = 2,
	FILE      = 3;

var TARGET_DIR;

function setup() {
	if (process.argv.length <= 2) {
		printHelp();
		process.exit(0);
	}

	process.argv.forEach(function(val, idx, array){
		if (idx == DIRECTORY) {
			makeDirectory(val);
		}
		else if (idx >= FILE)
			makeFile(val);
	});

	console.log('setup complete on directory "' + TARGET_DIR + '"');
}

function printHelp() {
	console.log('usage : [directory] [file1] [file2] ...');
}

function makeDirectory(val){
	TARGET_DIR = val;

	if (!fs.existsSync(TARGET_DIR))
		fs.mkdirSync(TARGET_DIR);
}

function makeFile(fileName){
	if (fileName.indexOf('.js') == -1)
		fileName += '.js';

	var file = TARGET_DIR + '/' + fileName;
	fs.writeFileSync(file, '#!/usr/bin/env node');
	fs.chmodSync(file, '755');
}

exports.setup         = setup;
exports.makeDirectory = makeDirectory;
exports.makeFile      = makeFile;

if (!module.parent) setup();