#!/usr/bin/env node

const semver = require('semver');
const packages = JSON.parse(JSON.parse(process.argv[2]));
const path = process.argv[3];
const pkg = require(`../${path}/package.json`);

// Log the details of the package we are checking
function logPackageChecking(name, gemVersion, packageVersion) {
	console.warn(`checking package: ${name}`);
	console.warn(`gemfury version: ${gemVersion}`);
	console.warn(`package.json version: ${packageVersion}`);
}

// Version compare or new package
if (Object.keys(packages).length) {
	const result = Object.keys(packages).filter(key => {
		if (key === pkg.name) {
			logPackageChecking(key, packages[key], pkg.version);
		}
		return key === pkg.name && semver.gt(pkg.version, packages[key]);
	});
	console.log(result.length > 0);
} else {
	logPackageChecking(pkg.name, null, pkg.version);
	console.log(true);
}

