/**
 * __tests__/unit/generate-config.js
 * Test: js/_generate-config.js
 */
'use strict';

const mockfs = require('../../js/__mocks__/_fs');
const MOCK_PACKAGES = mockfs.__fsMockFiles();

jest.mock('../../js/_check-exists');

const configGenerator = require('../../js/_generate-config');
const defaultConfig = require('../../js/config/default.json');

describe('Generate a valid config file', () => {
	beforeEach(() => {
		mockfs(MOCK_PACKAGES);
		jest.resetModules();
	});

	test('Resolves with default config if no user supplied config', () => {
		expect.assertions(1);
		return expect(
			configGenerator('')
		).resolves.toEqual(defaultConfig);
	});

	test('Resolves with new config if defaults overwritten', () => {
		const copy = JSON.parse(JSON.stringify(defaultConfig));
		const config = Object.assign(copy, {
			packagesDirectory: './new-directory',
			changelog: 'CHANGELOG.md',
			scope: 'otherscope'
		});
		config.required.push(config.changelog);

		jest.mock('path/to/file.ext', () => ({
			packagesDirectory: './new-directory',
			changelog: 'CHANGELOG.md',
			scope: 'otherscope'
		}), { virtual: true });

		expect.assertions(1);
		return expect(
			configGenerator('path/to/file.ext')
		).resolves.toEqual(config);
	});

	test('Resolves with new config if new items added', () => {
		const copy = JSON.parse(JSON.stringify(defaultConfig));
		const config = Object.assign(copy, {
			prefix: 'custom-prefix',
			folders: {
				foldera: ['ext'],
				folderb: ['ext']
			}
		});
		config.required.push(config.changelog);

		jest.mock('path/to/file.ext', () => ({
			prefix: 'custom-prefix',
			folders: {
				foldera: ['ext'],
				folderb: ['ext']
			}
		}), { virtual: true });

		expect.assertions(1);
		return expect(
			configGenerator('path/to/file.ext')
		).resolves.toEqual(config);
	});

	test('Resolves with new config if required extended', () => {
		const config = JSON.parse(JSON.stringify(defaultConfig));
		config.required.push('new-required-file.ext');
		config.required.push(config.changelog);

		jest.mock('path/to/file.ext', () => ({
			required: [
				'new-required-file.ext'
			]
		}), { virtual: true });

		expect.assertions(1);
		return expect(
			configGenerator('path/to/file.ext')
		).resolves.toEqual(config);
	});

	afterEach(() => {
		mockfs.restore();
	});
});
