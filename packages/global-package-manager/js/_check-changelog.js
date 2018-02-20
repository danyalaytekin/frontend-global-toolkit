/**
 * _check-changelog.js
 * Check changelog file updated
 */
'use strict';

const getPackageName = require('./_get-package-name');
const showOutput = require('./_show-output');

function checkChangelog(packagePath, changedFiles, changelogName) {
	const packageName = getPackageName(packagePath);
	const filename = `${packageName}/${changelogName}`;
	const errorMsg = `Cannot publish \`${packageName}\`: error checking git commits`;
	const failureMsg = `Cannot publish \`${packageName}\`: ${filename} file must be updated`;

	return new Promise((resolve, reject) => {
		if (changedFiles === undefined) {
			reject(new Error(errorMsg));
		}

		showOutput.logToConsole([{
			type: 'info',
			description: 'updated files',
			message: changedFiles.split('\n').join(', ')
		}]);

		const found = changedFiles.split('\n').findIndex(element => {
			return element.includes(filename);
		});

		if (found === -1) {
			reject(new Error(failureMsg));
		} else {
			resolve();
		}
	});
}

module.exports = checkChangelog;
