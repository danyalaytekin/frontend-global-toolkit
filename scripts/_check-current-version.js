/**
 * _check-current-version.js
 * Update by comparing NPM version and package.json version
 */
'use strict';

const semver = require('semver');
const getLatestVersion = require('./_get-latest-version');
const checkNewVersion = require('./_check-new-version');
const showOutput = require('./_show-output');

// Return array of objects containing output json
function getResultsOutput(name, latest, newVersion) {
	return [
		{
			type: 'info',
			description: 'checking package',
			message: name
		},
		{
			type: 'info',
			description: 'published version',
			message: latest
		},
		{
			type: 'info',
			description: 'package.json version',
			message: newVersion
		}
	];
}

// Return a promise based on if we need to publish a new version
function checkCurrentVersion(packagePath) {
	return new Promise((resolve, reject) => {
		const pkg = require(`${packagePath}/package.json`);
		const newVersion = checkNewVersion(pkg);
		const consoleSeparator = pkg.name.split('').fill('-').join('');

		showOutput.simpleLogToConsole(`${consoleSeparator}\n${pkg.name}\n${consoleSeparator}`);

		if (newVersion === '0.0.0') {
			showOutput.logToConsole([{
				type: 'info',
				description: 'unpublished',
				message: 'version is 0.0.0'
			}]);
			reject();
			return;
		}

		getLatestVersion(pkg.name.replace(/\//g, '%2F'))
			.then(latest => {
				const publishNewVersion = (latest) ? semver.gt(newVersion, latest) : true;

				showOutput.logToConsole(
					getResultsOutput(pkg.name, latest, newVersion)
				);

				if (publishNewVersion) {
					const config = showOutput.getOuputConfig('update package');
					resolve(showOutput.getConsoleOuput(config, 'info', publishNewVersion));
				} else {
					reject();
				}
			}).catch(() => {
				reject();
			});
	});
}

module.exports = checkCurrentVersion;

