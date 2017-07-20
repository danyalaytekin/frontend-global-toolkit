/**
 * Interactive CLI tool to create a new package
 */
'use strict';

const path = require('path');
const inquirer = require('inquirer');
const Listr = require('listr');

const config = require('../validation.json');
const getLicense = require('./_get-license');
const prompts = require('./_get-new-package-options');
const tasks = require('./_build-new-package');
const getPackages = require('./_get-packages');
const getPackageName = require('./_get-package-name');

const globalLicense = getLicense('../package.json');
const allPackagePaths = getPackages(path.resolve(__dirname, '../packages'));
const existingPackages = allPackagePaths.map(currentPath => {
	return getPackageName(currentPath);
});

inquirer
	.prompt(
		prompts(config, existingPackages)
	)
	.then(answers => {
		new Listr(
			tasks(config, globalLicense, answers)
		)
		.run()
		.catch(err => {
			console.error(err);
		});
	});
