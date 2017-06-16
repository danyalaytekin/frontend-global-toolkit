/**
 * _checkValidation.js
 * Get a list of all folders/files within a package folder
 * Check folders and files validate
 */
'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');
const config = require('../validation.json');
const getPackageName = require('./_getPackageName');
const showOutput = require('./_showOutput');

const validFolders = Object.keys(config.folders);
const blankResults = {
	required: {messaging: [], valid: true},
	folder: {messaging: [], valid: true},
	file: {messaging: [], valid: true},
	topLevel: {messaging: [], valid: true}
};

let requiredFiles = [];
let results = {};

// Check if a glob item is a required file
function isRequired(item) {
	const required = requiredFiles.includes(item);
	if (required) {
		results.required.messaging.push({
			type: 'success',
			description: 'validating',
			message: item + chalk.white.dim(' exists')
		});
		requiredFiles.splice(requiredFiles.findIndex(el => {
			return el === item;
		}), 1);
	}
	return required;
}

// Check if glob item is a valid folder name
function isFolder(directory, item) {
	const folder = fs.lstatSync(path.resolve(directory, item)).isDirectory();
	if (folder) {
		const splitGlob = item.split('/');
		const isValid = validFolders.includes(splitGlob[0]);
		results.folder.messaging.push({
			type: ((isValid) ? 'success' : 'fail'),
			description: 'validating',
			message: item + chalk.white.dim(
				(isValid) ?
				' is a valid folder' :
				' is not a valid folder'
			)
		});
		if (!isValid) {
			results.folder.valid = false;
		}
		return true;
	}
	return false;
}

// Check if glob item is a valid file within a valid folder
function isFileType(item) {
	const splitGlob = item.split('/');
	if (splitGlob.length > 1) {
		const topLevelFolder = splitGlob[0];
		const extension = splitGlob[splitGlob.length - 1].split('.')[1];
		if (validFolders.includes(topLevelFolder)) {
			const isValid = config.folders[topLevelFolder].includes(extension);
			results.file.messaging.push({
				type: ((isValid) ? 'success' : 'fail'),
				description: 'validating',
				message: item + chalk.white.dim(
					(isValid) ?
					` is a valid file in ${topLevelFolder}` :
					` is not a valid file in ${topLevelFolder}`
				)
			});
			if (!isValid) {
				results.file.valid = false;
			}
		}
		return true;
	}
	return false;
}

// Filter glob results
// Remove directory string and ignored files
function getFilteredResults(directory, files) {
	return files.map(s => {
		return s.replace(`${directory}/`, '');
	}).filter(el => {
		return config.ignored.length === config.ignored.filter(slug => {
			return !el.startsWith(slug);
		}).length;
	});
}

// Validation
// Glob for all files/folders in a package
function checkValidation(packagePath, options) {
	results = JSON.parse(JSON.stringify(blankResults));
	requiredFiles = JSON.parse(JSON.stringify(config.required));

	return new Promise((resolve, reject) => {
		glob(`${packagePath}/**/*`, options, (error, files) => {
			const packageName = getPackageName(packagePath);
			if (error) {
				reject(new Error(`Problem globbing files/folders in ${packageName}: ${error}`));
				return;
			}

			for (const value of getFilteredResults(packagePath, files)) {
				if (!isRequired(value)) {
					if (!isFolder(packagePath, value)) {
						if (!isFileType(value)) {
							results.topLevel.messaging.push({
								type: 'fail',
								description: 'validating',
								message: value + chalk.white.dim(' is not a valid file')
							});
							results.topLevel.valid = false;
						}
					}
				}
			}

			for (const item of requiredFiles) {
				results.required.messaging.push({
					type: 'fail',
					description: 'validating',
					message: item + chalk.white.dim(' does not exist')
				});
				results.required.valid = false;
			}

			showOutput.logToConsole(
				[].concat(...[results.required.messaging, results.topLevel.messaging, results.folder.messaging, results.file.messaging])
			);

			if (results.required.valid && results.folder.valid && results.file.valid && results.topLevel.valid) {
				resolve();
			} else {
				reject(new Error(`Invalid files or folders in ${packageName}`));
			}
		});
	});
}

module.exports = checkValidation;

