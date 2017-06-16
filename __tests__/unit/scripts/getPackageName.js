/**
 * __tests__/unit/scripts/getPackageName.js
 * Test: scripts/_getPackageName.js
 */
'use strict';

const getPackageName = require('scripts/_getPackageName');

describe('Package name from it\'s path', () => {
	test('The data is the package name', () => {
		const name = getPackageName('some/path/to/fec-package');
		expect.assertions(1);
		expect(name).toBe('fec-package');
	});
});