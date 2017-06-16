/**
 * __mocks__/glob.js
 * Mock globbing a directory
 */
'use strict';

const results = {
	pass: [
		'path/to/fec-package/required.md',
		'path/to/fec-package/ignored',
		'path/to/fec-package/ignored/ignoredfile.js',
		'path/to/fec-package/folder1',
		'path/to/fec-package/folder1/file.scss',
		'path/to/fec-package/folder1/file.css',
		'path/to/fec-package/folder2',
		'path/to/fec-package/folder2/file.js',
		'path/to/fec-package/folder2/file.json',
		'path/to/fec-package/folder2/subfolder',
		'path/to/fec-package/folder2/subfolder/file.js'
	],
	failIsRequired: [
		'path/to/fec-package/ignored',
		'path/to/fec-package/ignored/ignoredfile.js',
		'path/to/fec-package/folder1',
		'path/to/fec-package/folder1/file.scss',
		'path/to/fec-package/folder1/file.css',
		'path/to/fec-package/folder2',
		'path/to/fec-package/folder2/file.js',
		'path/to/fec-package/folder2/file.json',
		'path/to/fec-package/folder2/subfolder',
		'path/to/fec-package/folder2/subfolder/file.js'
	],
	failIsFolder: [
		'path/to/fec-package/required.md',
		'path/to/fec-package/ignored',
		'path/to/fec-package/ignored/ignoredfile.js',
		'path/to/fec-package/folderfail',
		'path/to/fec-package/folderfail/file.md',
		'path/to/fec-package/folder2',
		'path/to/fec-package/folder2/file.js',
		'path/to/fec-package/folder2/file.json',
		'path/to/fec-package/folder2/subfolder',
		'path/to/fec-package/folder2/subfolder/file.js'
	],
	failIsFileType: [
		'path/to/fec-package/required.md',
		'path/to/fec-package/ignored',
		'path/to/fec-package/ignored/ignoredfile.js',
		'path/to/fec-package/folder1',
		'path/to/fec-package/folder1/file.scss',
		'path/to/fec-package/folder1/file.js',
		'path/to/fec-package/folder2',
		'path/to/fec-package/folder2/file.js',
		'path/to/fec-package/folder2/file.json',
		'path/to/fec-package/folder2/subfolder',
		'path/to/fec-package/folder2/subfolder/file.js'
	],
	failIsTopLevelFile: [
		'path/to/fec-package/required.md',
		'path/to/fec-package/fail.md',
		'path/to/fec-package/ignored',
		'path/to/fec-package/ignored/ignoredfile.js',
		'path/to/fec-package/folder1',
		'path/to/fec-package/folder1/file.scss',
		'path/to/fec-package/folder1/file.css',
		'path/to/fec-package/folder2',
		'path/to/fec-package/folder2/file.js',
		'path/to/fec-package/folder2/file.json',
		'path/to/fec-package/folder2/subfolder',
		'path/to/fec-package/folder2/subfolder/file.js'
	]
};

const glob = (path, type, cb) => {
	cb(
		(type === 'error') ? 'error thrown' : null,
		(type === 'error') ? [] : results[type]
	);
};

module.exports = glob;
