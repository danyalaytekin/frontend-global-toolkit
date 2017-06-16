/**
 * __tests__/unit/scripts/bootstrap.js
 * Test: scripts/_bootstrap.js
 */
'use strict';

const mockSpawn = require('mock-spawn');

const spawn = mockSpawn();
require('child_process').spawn = spawn;

const bootstrap = require('scripts/_bootstrap');

describe('Lerna bootstrap', () => {
	test('Lerna completes with code 0', () => {
		spawn.setStrategy(function (command, args, opts) {
			return function (cb) {
				setTimeout(function() {
					return cb(0);
				}, 10);
			};
		});
		expect.assertions(1);
		return expect(bootstrap()).resolves.toEqual();
	});

	test('Lerna completes with code !== 0', () => {
		spawn.setStrategy(function (command, args, opts) {
			return function (cb) {
				setTimeout(function() {
					return cb(1);
				}, 10);
			};
		});
		expect.assertions(1);
		return expect(bootstrap()).rejects.toBeInstanceOf(Error);
	});

	test('Throws error when spawn fails', () => {
		spawn.setStrategy(function (cb) {
			this.emit('error', new Error('spawn ENOENT'));
			setTimeout(function() { return cb(1); }, 10);
		});
		expect.assertions(1);
		return expect(bootstrap()).rejects.toBeInstanceOf(Error);
	});
});
