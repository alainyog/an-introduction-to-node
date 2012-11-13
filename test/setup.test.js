var setup_js  = require('../setup.js');
var assert = require('assert');
var fs     = require('fs');

var TEST_DIR  = 'lesson_test';
var TEST_FILE = 'lesson_test.js';

suite('setup.makeDirectory', function() {
	// test 메소드가 호출되기 전에 호출
	// 주로 각 test에 사용된 리소스를 초기화 할 때 사용.
	setup(function(done) {
		setup_js.makeDirectory(TEST_DIR);
		done();
	});

	test('테스트용 디렉토리가 생성되어야 함', function(done) {
		
		fs.stat(TEST_DIR, function(err, stats) {
			if (err) throw err;
			assert.equal(stats.isDirectory(), true);
		});
		done();
	});

	// test 메소드가 종료될 때마다 호출.
	// 각 test에 사용된 리소스를 해제 할 때 사용.
	teardown(function(done) {
		fs.rmdirSync(TEST_DIR);
		done();
	});
});

suite('setup.makeFile', function() {
	var path = TEST_DIR + '/' + TEST_FILE;
	setup(function(done) {
		setup_js.makeDirectory(TEST_DIR);
		setup_js.makeFile(TEST_FILE);
		done();
	});

	test('테스트용 파일이 생성되어야 함', function(done) {
		fs.stat(path, function(err, stats) {
			if (err) throw err;
			assert.equal(stats.isFile(), true);
		});
		done();
	});

	test('테스트용 파일에 실행권한이 있어야 함', function(done) {
		fs.stat(path, function(err, stats) {
			if (err) throw err;

			// get permission (see http://www.tuxfiles.org/linuxhelp/filepermissions.html)
			var permissiom = (stats.mode & parseInt ("777", 8)).toString (8);
			var ownerPermissiom = permissiom[0];
			var canExcute = !!(ownerPermissiom & 1);
			assert.equal(canExcute, true);
		});
		done();
	});

	teardown(function(done) {
		fs.unlinkSync(path);
		fs.rmdirSync(TEST_DIR);
		done();
	});
});