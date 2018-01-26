/**
 * _check-history.js
 * Check HISTORY.md file updated
 */
'use strict';

const getPackageName = require('./_get-package-name');

function checkHistory(packagePath, changedFiles) {
	const packageName = getPackageName(packagePath);
	const filename = 'HISTORY.md';
	const errorMsg = `Cannot publish \`${packageName}\`: error checking git commits`;
	const failureMsg = `Cannot publish \`${packageName}\`: ${filename} file must be updated`;

	return new Promise((resolve, reject) => {
		if (changedFiles === undefined) {
			reject(new Error(errorMsg));
		}

		if (changedFiles.split('\n').includes(filename)) {
			resolve();
		} else {
			reject(new Error(failureMsg));
		}
	});
}

module.exports = checkHistory;
