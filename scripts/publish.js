/**
 * Publish packages with a new version to NPM
 */
'use strict';

const path = require('path');
const bootstrap = require('./_bootstrap');
const getPackages = require('./_getPackages');
const checkCurrentVersion = require('./_checkCurrentVersion');
const showOutput = require('./_showOutput');

const allPackagePaths = getPackages(path.resolve(__dirname, '../packages'));
const lastPackagePathIndex = allPackagePaths.length - 1;

// Loop through all packages
function pathLoop(i) {
	new Promise(resolve => {
		checkCurrentVersion(allPackagePaths[i])
			.then(data => {
				showOutput.simpleLogToConsole(data);
				// Publish to npm
				resolve();
			})
			.catch(resolve);
	})
	.then(() => i >= lastPackagePathIndex || pathLoop(i + 1));
}

// Run bootstrap then loop through packages
bootstrap()
	.then(() => {
		pathLoop(0);
	}).catch(error => {
		showOutput.simpleLogToConsole(error);
	});
