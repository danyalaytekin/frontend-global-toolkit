/**
 * __tests__/unit/check-history.js
 * Test: js/_check-history.js
 */
'use strict';

const checkHistory = require('../../js/_check-history');

describe('Check for updating of HISTORY.md when publishing', () => {
	test('Resolve if HISTORY.md has been updated', () => {
		expect.assertions(1);
		return expect(
			checkHistory('path/to/global-package', 'filename.ext\nHISTORY.md\nothername.ext')
		).resolves.toEqual();
	});

	test('Reject if HISTORY.md has not been updated', () => {
		expect.assertions(1);
		return expect(
			checkHistory('path/to/global-package', 'filename.ext\nNOTHISTORY.md\nothername.ext')
		).rejects.toBeInstanceOf(Error);
	});

	test('Reject if error in retrieving changed files', () => {
		expect.assertions(1);
		return expect(
			checkHistory('path/to/global-package', undefined)
		).rejects.toBeInstanceOf(Error);
	});
});
