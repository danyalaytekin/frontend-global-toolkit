/**
 * __tests__/unit/scripts/check-naming.js
 * Test: scripts/_check-naming.js
 */
'use strict';

jest.mock('scripts/_show-output');

jest.mock('path/to/fec-package/package.json', () => ({
	name: '@springernature/fec-package'
}), {virtual: true});

const checkNaming = require('scripts/_check-naming');

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
