/**
 * __tests__/unit/scripts/show-output.js
 * Test: scripts/_show-output.js
 */
'use strict';

const showOutput = require('scripts/_show-output');

const config = {
	description: '\u001b[35mdescription\u001b[39m',
	info: '\u001b[32minfo\u001b[39m',
	success: '\u001b[32m\u001b[1msuccess\u001b[22m\u001b[39m',
	fail: '\u001b[31m\u001b[1mfail\u001b[22m\u001b[39m'
};

describe('Console messaging', () => {
	test('The color coded output configuration is valid', () => {
		const json = showOutput.getOuputConfig('description');
		expect.assertions(1);
		expect(json).toMatchObject(config);
	});

	test('the color coded message (info) is correct', () => {
		const output = showOutput.getConsoleOuput(config, 'info', 'message');
		expect.assertions(1);
		expect(output).toBe('\u001b[37m\u001b[32minfo\u001b[37m \u001b[35mdescription\u001b[37m message\u001b[39m');
	});

	test('the color coded message (success) is correct', () => {
		const output = showOutput.getConsoleOuput(config, 'success', 'message');
		expect.assertions(1);
		expect(output).toBe('\u001b[37m\u001b[32m\u001b[1msuccess\u001b[22m\u001b[37m \u001b[35mdescription\u001b[37m message\u001b[39m');
	});

	test('the color coded message (fail) is correct', () => {
		const output = showOutput.getConsoleOuput(config, 'fail', 'message');
		expect.assertions(1);
		expect(output).toBe('\u001b[37m\u001b[31m\u001b[1mfail\u001b[22m\u001b[37m \u001b[35mdescription\u001b[37m message\u001b[39m');
	});
});