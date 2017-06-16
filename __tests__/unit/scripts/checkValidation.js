/**
 * __tests__/unit/scripts/checkValidation.js
 * Test: scripts/_checkValidation.js
 */
'use strict';

const glob = require('__mocks__/glob');
const mockfs = require('__mocks__/fs');

const MOCK_PACKAGES = mockfs.__fsMockFiles();

jest.mock('scripts/_showOutput');

jest.mock('validation.json', () => ({
	required: ['required.md'],
	ignored: ['ignored'],
	folders: {
		folder1: ['scss', 'css'],
		folder2: ['js', 'json']
	}
}));

describe('Check validation', () => {

	beforeEach(() => {
		jest.resetModules();
	});

	test('Error returned from glob', () => {
		const checkValidation = require('scripts/_checkValidation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation('path/to/fec-package', 'error')
		).rejects.toBeInstanceOf(Error);
	});

	test('Resolves when filesystem matches config', () => {
		const checkValidation = require('scripts/_checkValidation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation('path/to/fec-package', 'pass')
		).resolves.toEqual();
	});

	test('Rejects when required file missing', () => {
		const checkValidation = require('scripts/_checkValidation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation('path/to/fec-package', 'failIsRequired')
		).rejects.toBeInstanceOf(Error);
	});

	test('Rejects when invalid folder present', () => {
		const checkValidation = require('scripts/_checkValidation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation('path/to/fec-package', 'failIsFolder')
		).rejects.toBeInstanceOf(Error);
	});

	test('Rejects when invalid file type present in a valid folder', () => {
		const checkValidation = require('scripts/_checkValidation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation('path/to/fec-package', 'failIsFileType')
		).rejects.toBeInstanceOf(Error);
	});

	test('Rejects when invalid file present at top level', () => {
		const checkValidation = require('scripts/_checkValidation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation('path/to/fec-package', 'failIsTopLevelFile')
		).rejects.toBeInstanceOf(Error);
	});

	afterEach(() => {
		mockfs.restore();
	});
});
