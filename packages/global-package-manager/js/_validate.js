/**
 * Check all updated packages for:
 * Required files
 * Naming conventions
 * Folder/file structure
 * Licensing information
 */
'use strict';

const getPackages = require('./_get-packages');
const getLicense = require('./_get-license');
const checkNaming = require('./_check-naming');
const checkValidation = require('./_check-validation');
const checkLicense = require('./_check-license');
const exitScript = require('./_exit-script');

let config;
let allPackagePaths;
let globalLicense;
let lastArgument;
let filteredPaths;
let lastPackagePathIndex;

function filterPackagePathList() {
	if (lastArgument.startsWith(config.prefix)) {
		return allPackagePaths.filter(path => {
			return path.endsWith(lastArgument);
		});
	}
	return allPackagePaths;
}

function allPackagePathLoop(i) {
	new Promise(resolve => {
		checkNaming(config.scope, config.prefix, filteredPaths[i])
			.then(() => {
				checkLicense(filteredPaths[i], globalLicense)
					.then(() => {
						checkValidation(config, filteredPaths[i], {dot: true})
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
	}).then(() => i >= lastPackagePathIndex || allPackagePathLoop(i + 1));
}

module.exports = (validationPath, packageJsonPath, packagesDirectory) => {
	config = require(validationPath);
	allPackagePaths = getPackages(packagesDirectory);
	globalLicense = getLicense(packageJsonPath);
	lastArgument = process.argv[process.argv.length - 1];
	filteredPaths = filterPackagePathList();
	lastPackagePathIndex = filteredPaths.length - 1;

	if (filteredPaths.length === 0) {
		exitScript.throwErr(
			(lastArgument.startsWith(config.prefix)) ?
				`Package \`${lastArgument}\` could not be found` :
				'No packages found to validate'
		);
	}

	allPackagePathLoop(0);
};
