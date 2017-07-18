/**
 * _check-naming.js
 * Check naming conventions
 */
'use strict';

const chalk = require('chalk');
const getPackageName = require('./_get-package-name');
const showOutput = require('./_show-output');

// Check a string against a RegExp
function checkName(name, re) {
	return re.test(name);
}

// Return array of objects containing output json
function getResults(folderName, packageName, validFolder, validPackage) {
	return [
		{
			type: ((validFolder) ? 'success' : 'fail'),
			description: 'validating',
			message: folderName + chalk.white.dim((validFolder) ? ' valid folder name' : ' invalid folder name')
		},
		{
			type: ((validPackage) ? 'success' : 'fail'),
			description: 'validating',
			message: packageName + chalk.white.dim((validPackage) ? ' valid package name' : ' invalid package name')
		}
	];
}

// Return a promise based on naming validation
function validNaming(scope, prefix, packagePath) {
	return new Promise((resolve, reject) => {
		const folderName = getPackageName(packagePath);
		const consoleSeparator = `packages/${folderName}`.split('').fill('-').join('');
		const packageName = require(`${packagePath}/package.json`).name;
		const validFolder = checkName(folderName, new RegExp(`^${prefix}-`));
		const validPackage = checkName(packageName, new RegExp(`^@${scope}/${prefix}-`));
		const validates = validFolder && validPackage;
		const results = getResults(folderName, packageName, validFolder, validPackage);

		showOutput.simpleLogToConsole(`${consoleSeparator}\npackages/${folderName}\n${consoleSeparator}`);
		showOutput.logToConsole(results);

		if (validates) {
			resolve();
		} else if (!validFolder) {
			reject(new Error(`Invalid folder name: ${folderName}`));
		} else if (!validPackage) {
			reject(new Error(`Invalid package name: ${packageName}`));
		}
	});
}

module.exports = validNaming;
