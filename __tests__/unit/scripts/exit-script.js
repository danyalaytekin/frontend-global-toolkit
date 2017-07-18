/**
 * __tests__/unit/scripts/exit-script.js
 * Test: scripts/_exit-script.js
 */
'use strict';

jest.mock('scripts/_show-output');

const exitScript = require('scripts/_exit-script');

describe('Exiting a script', () => {	
	test('throwErr function should throw an error', () => {
		expect.assertions(1);
		expect(() => {
			exitScript.throwErr('err');
		}).toThrow();
	});

	test('displayErr function should log to the console', () => {
		const showOutput = require('scripts/_show-output');
		const spy = jest.spyOn(showOutput, 'simpleLogToConsole');
		exitScript.displayErr('err');
		
		expect(spy).toHaveBeenCalled();

		spy.mockReset();
  		spy.mockRestore();
	});
});