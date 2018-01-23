/**
 * Publish packages with a new version to NPM
 */
'use strict';

const bootstrap = require('./_bootstrap');
const getPackages = require('./_get-packages');
const checkCurrentVersion = require('./_check-current-version');
const showOutput = require('./_show-output');
const exitScript = require('./_exit-script');
const publishToNpm = require('./_publish-to-npm');

let allPackagePaths;
let lastPackagePathIndex;

// Loop through all packages
function pathLoop(i) {
	new Promise(resolve => {
		checkCurrentVersion(allPackagePaths[i])
			.then(data => {
				showOutput.simpleLogToConsole(data);
				publishToNpm({access: 'public'}, allPackagePaths[i])
					.then(() => {
						resolve();
					})
					.catch(err => {
						exitScript.displayErr(err);
					});
			})
			.catch(resolve);
	})
	.then(() => i >= lastPackagePathIndex || pathLoop(i + 1));
}

module.exports = packagesDirectory => {
	allPackagePaths = getPackages(packagesDirectory);
	lastPackagePathIndex = allPackagePaths.length - 1;

	// Run bootstrap then loop through packages
	bootstrap()
		.then(() => {
			if (process.env.NPM_TOKEN) {
				pathLoop(0);
			} else {
				exitScript.displayErr(
					new Error('No NPM login token found\nPlease set the NPM_TOKEN environment variable')
				);
			}
		}).catch(err => {
			exitScript.displayErr(err);
		});
};
