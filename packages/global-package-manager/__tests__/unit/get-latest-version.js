/**
 * __tests__/unit/get-latest-version.js
 * Test: js/_get-latest-version.js
 */
'use strict';

jest.mock('../../js/_npm-registry-request');
jest.mock('../../js/_show-output');

const getLatestVersion = require('../../js/_get-latest-version');

describe('Get latest version of package published on NPM', () => {
	test('The data is a valid version number', () => {
		expect.assertions(1);
		return getLatestVersion('valid').then(data => {
			expect(data).toBe('1.0.0');
		});
	});

	test('The data is null when no package found', () => {
		expect.assertions(1);
		return getLatestVersion('empty').then(data => {
			expect(data).toBe(null);
		});
	});

	test('Rejects when there is a problem with the registry', () => {
		expect.assertions(1);
		return expect(getLatestVersion('error')).rejects.toEqual();
	});
});
