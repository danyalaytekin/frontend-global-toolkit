/**
 * Check all updated packages for:
 * Required files
 * Naming conventions
 * Folder/file structure
 * Licensing information
 */
'use strict';

const path = require('path');
const config = require('../validation.json');
const getPackages = require('./_get-packages');
const getLicense = require('./_get-license');
const checkNaming = require('./_check-naming');
const checkValidation = require('./_check-validation');
const checkLicense = require('./_check-license');
const exitScript = require('./_exit-script');

const allPackagePaths = getPackages(path.resolve(__dirname, '../packages'));
const lastPackagePathIndex = allPackagePaths.length - 1;
const globalLicense = getLicense('../package.json');

// Loop through all packages
(function pathLoop(i) {
	new Promise(resolve => {
		checkNaming(config.scope, config.prefix, allPackagePaths[i])
			.then(() => {
				checkLicense(allPackagePaths[i], globalLicense)
					.then(() => {
						checkValidation(allPackagePaths[i], {dot: true})
							.then(resolve)
							.catch(err => {
								exitScript.displayErr(err);
							});
					}).catch(err => {
						exitScript.displayErr(err);
					});
			}).catch(err => {
				exitScript.displayErr(err);
			});
	}).then(() => i >= lastPackagePathIndex || pathLoop(i + 1));
})(0);
