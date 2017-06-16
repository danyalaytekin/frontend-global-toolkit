/**
 * _getLatestVersion.js
 * Get the latest version of a package from npm registry
 */
'use strict';

const npmRegistryRequest = require('./_npmRegistryRequest');
const showOutput = require('./_showOutput');

function getLatestVersion(packageName) {
	return new Promise((resolve, reject) => {
		npmRegistryRequest(packageName)
			.then(data => {
				resolve((data['dist-tags'] && data['dist-tags'].latest) ? data['dist-tags'].latest : null);
			}).catch(error => {
				showOutput.simpleLogToConsole(`Error checking npm version of ${packageName}.\n${error}`);
				reject();
			});
	});
}

module.exports = getLatestVersion;
