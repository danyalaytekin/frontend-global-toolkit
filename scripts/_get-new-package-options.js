/**
 * _get-new-package-options.js
 * Interactive prompt for package information
 */
'use strict';

const sanitize = require('sanitize-filename');
const validatePkgName = require('validate-npm-package-name');

// Enforce the correct prefix and sanitize
function prefixName(config, name) {
	if (
		sanitize(name).startsWith(`${config.prefix}-`)
	) {
		return sanitize(name);
	}
	return `${config.prefix}-${sanitize(name)}`;
}

// Make sure the name is valid
function checkValidName(config, existingPackages, name) {
	if (
		name.length === (config.prefix.length + 1) ||
		name.startsWith(`${config.prefix}-${config.prefix}`)
	) {
		return `Component \`${name}\` is invalid`;
	} else if (checkPackageExists(existingPackages, name)) {
		return `Component \`${name}\` already exists`;
	} else if (!validatePkgName(name).validForNewPackages) {
		return `Component \`${name}\` is not a valid NPM package name`;
	}
	return true;
}

// Array of valid folders
function getValidFolders(config) {
	return (config.folders && Object.keys(config.folders).length > 0) ? Object.keys(config.folders) : [];
}

// Capitalize first letter of each word only
function capitalizeAuthorName(name) {
	return sanitize(name).toLowerCase().replace(/(?:^|\s)\S/g, firstChar => {
		return firstChar.toUpperCase();
	});
}

// Return true if package already exists
function checkPackageExists(existingPackages, name) {
	return existingPackages.includes(name);
}

module.exports = (config, existingPackages) => [
	{
		type: 'input',
		name: 'pkgname',
		message: 'What is the name of your new component:',
		filter: input => prefixName(config, input),
		validate: input => checkValidName(config, existingPackages, input)
	},
	{
		type: 'input',
		name: 'description',
		message: 'Write a short description of your new component:'
	},
	{
		type: 'input',
		name: 'author',
		message: 'Enter component author name:',
		filter: input => capitalizeAuthorName(input)
	},
	{
		type: 'checkbox',
		name: 'folders',
		message: 'Select which folders you are going to need:',
		choices: getValidFolders(config),
		when: getValidFolders(config).length > 0
	}
];
