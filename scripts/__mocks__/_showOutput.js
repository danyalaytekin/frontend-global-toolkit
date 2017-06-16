/**
 * __mocks__/_showOutput.js
 * Mock output to stop logging in tests
 */
'use strict';

const chalk = require('chalk');

// Unmocked
function getOuputConfig(desc) {
	return {
		description: chalk.magenta(desc),
		info: chalk.green('info'),
		success: chalk.green.bold('success'),
		fail: chalk.red('fail')
	};
}

// Unmocked
function getConsoleOuput(json, type, msg) {
	return chalk.white(
		`${json[type]} ` +
		`${json.description} ` +
		`${msg}`
	);
}

// Kill console logging
const logToConsole = () => null;

// Kill simple console logging
const simpleLogToConsole = () => null;

module.exports = {
	logToConsole,
	simpleLogToConsole,
	getOuputConfig,
	getConsoleOuput
};
