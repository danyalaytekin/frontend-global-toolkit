/**
 * Interactive tool to create a new package
 */
'use strict';

const inquirer = require('inquirer');
const Listr = require('listr');

const getLicense = require('./_get-license');
const prompts = require('./_get-new-package-options');
const tasks = require('./_build-new-package');
const getPackages = require('./_get-packages');
const getPackageName = require('./_get-package-name');

module.exports = (validationPath, packageJsonPath, packagesDirectory) => {
	const config = require(validationPath);
	const allPackagePaths = getPackages(packagesDirectory);
	const globalLicense = getLicense(packageJsonPath);

	const existingPackages = allPackagePaths.map(currentPath => {
		return getPackageName(currentPath);
	});

	inquirer
		.prompt(
		prompts(config, existingPackages)
		)
		.then(answers => {
			new Listr(
				tasks(config, globalLicense, packagesDirectory, answers)
			)
				.run()
				.catch(err => {
					console.error(err);
				});
		});
};
