/**
 * Check all updated packages for:
 * Required files
 * Naming conventions
 * Folder/file structure
 */
'use strict';

const path = require('path');
const config = require('../validation.json');
const getPackages = require('./_getPackages');
const checkNaming = require('./_checkNaming');
const checkValidation = require('./_checkValidation');
const showOutput = require('./_showOutput');

const allPackagePaths = getPackages(path.resolve(__dirname, '../packages'));
const lastPackagePathIndex = allPackagePaths.length - 1;

// Loop through all packages
(function pathLoop(i) {
	new Promise(resolve => {
		checkNaming(config.scope, config.prefix, allPackagePaths[i])
			.then(() => {
				checkValidation(allPackagePaths[i], {dot: true})
					.then(resolve)
					.catch(error => {
						showOutput.simpleLogToConsole(error);
						process.exit(1);
					});
			}).catch(error => {
				showOutput.simpleLogToConsole(error);
				process.exit(1);
			});
	}).then(() => i >= lastPackagePathIndex || pathLoop(i + 1));
})(0);
