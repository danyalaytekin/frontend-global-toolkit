/**
 * _get-license.js
 * Get the global licence information
 */
'use strict';

const exitScript = require('./_exit-script');

function getLicense(path) {
	const licenseInfo = require(path).license;

	if (!licenseInfo) {
		exitScript.throwErr('No licence information found in top-level package.json. This MUST be fixed before release.');
	}
	return licenseInfo;
}

module.exports = getLicense;
