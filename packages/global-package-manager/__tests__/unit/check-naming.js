/**
 * __tests__/unit/check-naming.js
 * Test: js/_check-naming.js
 */
'use strict';

jest.mock('../../js/_show-output');

jest.mock('path/to/global-package/package.json', () => ({
	name: '@springernature/global-package'
}), {virtual: true});

const checkNaming = require('../../js/_check-naming');

describe('Check naming conventions', () => {
	test('Package and folder names are valid', () => {
		expect.assertions(1);
		return expect(
			checkNaming('springernature', 'global', 'path/to/global-package')
		).resolves.toEqual();
	});

	test('Reject if Package name is not valid', () => {
		expect.assertions(1);
		return expect(
			checkNaming('fail', 'global', 'path/to/global-package')
		).rejects.toBeInstanceOf(Error);
	});

	test('Reject if Folder name is not valid', () => {
		expect.assertions(1);
		return expect(
			checkNaming('springernature', 'fail', 'path/to/global-package')
		).rejects.toBeInstanceOf(Error);
	});
});