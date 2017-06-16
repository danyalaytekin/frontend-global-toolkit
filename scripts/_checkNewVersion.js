/**
 * _checkNewVersion.js
 * Check the latest version of a package from it's package.json
 */
'use strict';

const semver = require('semver');

function checkNewVersion(pkg) {
	const currentVersion = semver.valid(pkg.version);
	if (!currentVersion) {
		throw new Error(
			`Invalid semver version ${pkg.version} for ${pkg.name}. This MUST be fixed before release.`
		);
	}
	return currentVersion;
}

module.exports = checkNewVersion;
