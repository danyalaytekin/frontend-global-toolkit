/**
 * __tests__/unit/scripts/publish-to-npm.js
 * Test: scripts/_npm-to-npm.js
 */
'use strict';

const pmock = require('pmock');

jest.mock('npm-utils');
jest.mock('scripts/_show-output');

describe('Publishing to NPM', () => {
	beforeEach(() => {
		require('npm-utils');
        this.chdir = pmock.chdir('path/to/mock');
	});

	test('Should resolve when publish step is successful', () => {
		const publishToNpm = require('scripts/_publish-to-npm');
		expect.assertions(1);
		return expect(
			publishToNpm({}, 'path/to/success')
		).resolves.toEqual();
	});

	test('Should reject if publish step fails', () => {
		const publishToNpm = require('scripts/_publish-to-npm');
		expect.assertions(1);
		return expect(
			publishToNpm({}, 'path/to/fail')
		).rejects.toBeInstanceOf(Error);
	});

	afterEach(() => {
        this.chdir.reset();
    });
});
