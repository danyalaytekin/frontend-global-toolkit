/**
 * __tests__/unit/check-validation.js
 * Test: js/_check-validation.js
 */
'use strict';

const mockfs = require('../../js/__mocks__/_fs');
const MOCK_PACKAGES = mockfs.__fsMockFiles();

jest.mock('../../js/_glob-wrapper');
jest.mock('../../js/_show-output');

const validationConfig = {
	required: ['required.md'],
	ignored: ['ignored'],
	folders: {
		folder1: ['scss', 'css'],
		folder2: ['js', 'json']
	}
};

describe('Check validation', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	test('Error returned from glob', () => {
		const checkValidation = require('../../js/_check-validation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation(validationConfig, 'path/to/global-package', 'error')
		).rejects.toBeInstanceOf(Error);
	});

	test('Resolves when filesystem matches config', () => {
		const checkValidation = require('../../js/_check-validation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation(validationConfig, 'path/to/global-package', 'pass')
		).resolves.toEqual();
	});

	test('Rejects when required file missing', () => {
		const checkValidation = require('../../js/_check-validation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation(validationConfig, 'path/to/global-package', 'failIsRequired')
		).rejects.toBeInstanceOf(Error);
	});

	test('Rejects when invalid folder present', () => {
		const checkValidation = require('../../js/_check-validation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation(validationConfig, 'path/to/global-package', 'failIsFolder')
		).rejects.toBeInstanceOf(Error);
	});

	test('Rejects when invalid file type present in a valid folder', () => {
		const checkValidation = require('../../js/_check-validation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation(validationConfig, 'path/to/global-package', 'failIsFileType')
		).rejects.toBeInstanceOf(Error);
	});

	test('Rejects when invalid file present at top level', () => {
		const checkValidation = require('../../js/_check-validation');
		mockfs(MOCK_PACKAGES);

		expect.assertions(1);
		return expect(
			checkValidation(validationConfig, 'path/to/global-package', 'failIsTopLevelFile')
		).rejects.toBeInstanceOf(Error);
	});

	afterEach(() => {
		mockfs.restore();
	});
});
