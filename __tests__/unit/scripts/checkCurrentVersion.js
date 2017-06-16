/**
 * __tests__/unit/scripts/checkCurrentVersion.js
 * Test: scripts/_checkCurrentVersion.js
 */
'use strict';

jest.mock('scripts/_getLatestVersion');
jest.mock('scripts/_checkNewVersion');
jest.mock('scripts/_showOutput');

jest.mock('path/to/fec-package/package.json', () => ({
	name: 'fec-package'
}), {virtual: true});

jest.mock('path/to/fec-match/package.json', () => ({
	name: 'fec-match'
}), {virtual: true});

jest.mock('path/to/fec-older/package.json', () => ({
	name: 'fec-older'
}), {virtual: true});

jest.mock('path/to/fec-none/package.json', () => ({
	name: 'fec-none'
}), {virtual: true});

const checkCurrentVersion = require('scripts/_checkCurrentVersion');

describe('Compare NPM version and package.json version', () => {
	test('Resolve with message when newer version in package.json - 3.0.0 > 2.0.0', () => {
		expect.assertions(1);
		return checkCurrentVersion('path/to/fec-package').then(data => {
			expect(data).toBe('\u001b[37m\u001b[32minfo\u001b[37m \u001b[35mupdate package\u001b[37m true\u001b[39m');
		});
	});

	test('Reject when same version in package.json - 2.0.0 == 2.0.0', () => {
		expect.assertions(1);
		return expect(checkCurrentVersion('path/to/fec-match')).rejects.toEqual();
	});

	test('Reject when older version in package.json - 1.0.0 > 2.0.0', () => {
		expect.assertions(1);
		return expect(checkCurrentVersion('path/to/fec-older')).rejects.toEqual();
	});

	test('Reject when version is 0.0.0 in package.json (no publish)', () => {
		expect.assertions(1);
		return expect(checkCurrentVersion('path/to/fec-none')).rejects.toEqual();
	});
});
