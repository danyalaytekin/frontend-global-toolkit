#!/usr/bin/env node

const semver = require('semver');

const packages = JSON.parse(JSON.parse(process.argv[2]));
const path = process.argv[3];
const pkg = require(`../${path}/package.json`);

const result = Object.keys(packages).filter(key => {
	if (key === pkg.name) {
		console.warn(`checking package:     ${key}`);
		console.warn(`gemfury version:      ${packages[key]}`);
		console.warn(`package.json version: ${pkg.version}`);
	}
	return key === pkg.name && semver.gt(pkg.version, packages[key]);
});

console.log(result.length > 0);
