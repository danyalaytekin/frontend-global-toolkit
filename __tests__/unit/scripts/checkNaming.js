/**
 * __tests__/unit/scripts/checkNaming.js
 * Test: scripts/_checkNaming.js
 */
'use strict';

jest.mock('scripts/_showOutput');

jest.mock('path/to/fec-package/package.json', () => ({
	name: '@springernature/fec-package'
}), {virtual: true});

const checkNaming = require('scripts/_checkNaming');

describe('Check naming conventions', () => {
	test('Package and folder names are valid', () => {
		expect.assertions(1);
		return expect(
			checkNaming('springernature', 'fec', 'path/to/fec-package')
		).resolves.toEqual();
	});

	test('Reject if Package name is not valid', () => {
		expect.assertions(1);
		return expect(
			checkNaming('fail', 'fec', 'path/to/fec-package')
		).rejects.toBeInstanceOf(Error);
	});

	test('Reject if Folder name is not valid', () => {
		expect.assertions(1);
		return expect(
			checkNaming('springernature', 'fail', 'path/to/fec-package')
		).rejects.toBeInstanceOf(Error);
	});
});
