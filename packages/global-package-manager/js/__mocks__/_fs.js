/**
 * __mocks__/fs.js
 * Mock the filesystem for tests
 */
'use strict';

const fs = require('mock-fs');

const __fsMockFiles = () => {
	return {
		'path/to/global-package': {
			'required.md': 'file content',
			'fail.md': 'file content',
			folder1: {
				'file.scss': 'file content',
				'file.css': 'file content',
				'file.js': 'file content'
			},
			folder2: {
				'file.js': 'file content',
				'file.json': 'file content',
				subfolder: {
					'file.js': 'file content'
				}
			},
			folderfail: {
				'file.md': 'file content'
			}
		},
		'path/to/global-package-b': {
			'some-file.txt': 'file content here',
			'empty-dir': {/** empty directory */}
		},
		'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
		'some/other/path': {/** another empty directory */}
	};
};

const __fsMockFilesEmpty = () => {
	return {
		'path/to/some.png': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
		'some/other/path': {/** another empty directory */}
	};
};

fs.__fsMockFiles = __fsMockFiles;
fs.__fsMockFilesEmpty = __fsMockFilesEmpty;

module.exports = fs;
