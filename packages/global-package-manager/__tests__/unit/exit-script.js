/**
 * __tests__/unit/exit-script.js
 * Test: js/_exit-script.js
 */
'use strict';

jest.mock('../../js/_show-output');

const exitScript = require('../../js/_exit-script');

describe('Exiting a script', () => {
	test('throwErr function should throw an error', () => {
		expect.assertions(1);
		expect(() => {
			exitScript.throwErr('err');
		}).toThrow();
	});

	test('displayErr function should log to the console', () => {
		const showOutput = require('../../js/_show-output');
		const spy = jest.spyOn(showOutput, 'simpleLogToConsole');
		exitScript.displayErr('err');

		expect(spy).toHaveBeenCalled();

		spy.mockReset();
  		spy.mockRestore();
	});
});