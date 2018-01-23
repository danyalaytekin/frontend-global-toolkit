#! /usr/bin/env node

const path = require('path');

const publishPackages = require(path.resolve(__dirname, './_publish'));

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

publishPackages(
	path.resolve(process.cwd(), packageJson.packageManager.packagesDirectory)
);
