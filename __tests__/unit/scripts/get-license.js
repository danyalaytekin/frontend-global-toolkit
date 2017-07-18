/**
 * __tests__/unit/scripts/get-license.js
 * Test: scripts/_get-license.js
 */
'use strict';

const getLicense = require('scripts/_get-license');

jest.mock('package.json', () => ({
	license: "license-name"
}));

jest.mock('path/to/package.json', () => ({}), {virtual: true});

describe('Check license', () => {
	test('Throw error when no license info present in the top level package.json', () => {
		expect.assertions(1);
		expect(() => {
			getLicense('path/to/package.json');
		}).toThrow();
	});

    test('Return the licence type from package.json', () => {
        const license = getLicense('package.json');
		expect.assertions(1);
		expect(license).toEqual('license-name');
	});
});