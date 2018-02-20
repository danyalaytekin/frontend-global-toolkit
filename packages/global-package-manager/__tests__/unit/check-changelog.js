/**
 * __tests__/unit/check-changelog.js
 * Test: js/_check-changelog.js
 */
'use strict';

jest.mock('../../js/_show-output');

const checkChangelog = require('../../js/_check-changelog');

describe('Check for updating of changelog when publishing', () => {
	test('Resolve if changelog has been updated', () => {
		expect.assertions(1);
		return expect(
			checkChangelog(
				'path/to/global-package',
				'filename.ext\npath/to/global-package/HISTORY.md\nothername.ext',
				'HISTORY.md'
			)
		).resolves.toEqual();
	});

	test('Reject if changelog has not been updated', () => {
		expect.assertions(1);
		return expect(
			checkChangelog(
				'path/to/global-package',
				'filename.ext\npath/to/other-package/HISTORY.md\nothername.ext',
				'HISTORY.md'
			)
		).rejects.toBeInstanceOf(Error);
	});

	test('Reject if wrong changelog has been updated', () => {
		expect.assertions(1);
		return expect(
			checkChangelog(
				'path/to/global-package',
				'filename.ext\npath/to/global-package/HISTORY.md\nothername.ext',
				'CHANGELOG.md'
			)
		).rejects.toBeInstanceOf(Error);
	});

	test('Reject if error in retrieving changed files', () => {
		expect.assertions(1);
		return expect(
			checkChangelog(
				'path/to/global-package',
				undefined,
				'HISTORY.md'
			)
		).rejects.toBeInstanceOf(Error);
	});
});
