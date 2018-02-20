/**
 * _generate-config.js
 * Generate a valid config file
 */
'use strict';

const path = require('path');

const defaultConfig = require('./config/default.json');
const exists = require('./_check-exists');

let userConfig;

// Use default config item if not set by user
function setConfigItem(item) {
	if (userConfig[item]) {
		return userConfig[item];
	}
	return defaultConfig[item];
}

// Merge two arrays with no duplicates
function mergeConfigItem(item) {
	const arr = userConfig[item] || [];
	return [...new Set([...defaultConfig[item], ...arr])];
}

// Create a config file
function generateConfig() {
	userConfig.scope = setConfigItem('scope');
	userConfig.changelog = setConfigItem('changelog');
	userConfig.packagesDirectory = setConfigItem('packagesDirectory');
	userConfig.required = [...new Set([
		...mergeConfigItem('required'),
		...[userConfig.changelog]
	])];
	return userConfig;
}

function checkUserConfig(fileName) {
	return new Promise(resolve => {
		exists.fileExists(path.resolve(process.cwd(), fileName))
			.then(pathName => {
				userConfig = require(pathName);
				resolve(generateConfig());
			})
			.catch(() => {
				resolve(defaultConfig);
			});
	});
}

module.exports = checkUserConfig;
