/**
 * _build-new-package.js
 * Build new package structure in the packages folder
 */
'use strict';

const fs = require('fs');
const chalk = require('chalk');

const folderTasks = [];
const fileTasks = [];
let filePath;

/* eslint-disable no-template-curly-in-string */
const fileDetails = {
	'package.json': null,
	'.npmrc': '//registry.npmjs.org/:_authToken=${NPM_TOKEN}'
};
/* eslint-enable no-template-curly-in-string */

// Create package.json file contents
function configurePackageJson(config, globalLicense, answers) {
	return JSON.stringify({
		name: `@${config.scope}/${answers.pkgname}`,
		version: '0.0.0',
		license: globalLicense,
		description: answers.description,
		keywords: [],
		author: answers.author
	}, null, 2);
}

// Create folders based on answers
function generateFolders(answers) {
	if (answers.folders) {
		for (const value of answers.folders) {
			folderTasks.push({
				title: `Create folder ${chalk.bold.white(answers.pkgname)}${chalk.bold.white('/')}${chalk.bold.white(value)}`,
				task: () => fs.mkdir(`${filePath}/${answers.pkgname}/${value}`, err => {
					if (err) {
						console.error(err);
					} else {
						fs.writeFile(`${filePath}/${answers.pkgname}/${value}/.gitkeep`, '// temporary file, delete as appropriate', err => {
							if (err) {
								console.error(err);
							}
						});
					}
				})
			});
		}
	}

	return folderTasks;
}

// Create files based on required config
function generateFiles(config, answers) {
	for (const value of config.required) {
		if (Object.prototype.hasOwnProperty.call(fileDetails, value)) {
			fileTasks.push({
				title: `Create file ${chalk.bold.white(value)}`,
				task: () => fs.writeFile(`${filePath}/${answers.pkgname}/${value}`, fileDetails[value], err => {
					if (err) {
						console.error(err);
					}
				})
			});
		} else {
			fileTasks.push({
				title: `Create file ${chalk.bold.white(value)}`,
				task: () => fs.writeFile(`${filePath}/${answers.pkgname}/${value}`, '', err => {
					if (err) {
						console.error(err);
					}
				})
			});
		}
	}

	return fileTasks;
}

module.exports = (config, globalLicense, packagesDirectory, answers) => {
	filePath = packagesDirectory;

	if (config.required && config.required.includes('package.json')) {
		fileDetails['package.json'] = configurePackageJson(config, globalLicense, answers);
	}

	return [
		{
			title: `Create folder ${chalk.bold.white(answers.pkgname)}`,
			task: () => fs.mkdir(`${filePath}/${answers.pkgname}`, err => {
				if (err) {
					console.error(err);
				}
			})
		},
		...generateFolders(answers),
		...generateFiles(config, answers)
	];
};
