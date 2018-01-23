#! /usr/bin/env node

const path = require('path');

const validatePackages = require(path.resolve(__dirname, './_validate'));

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

validatePackages(
	path.resolve(process.cwd(), packageJson.packageManager.validationPath),
	packageJsonPath,
	path.resolve(process.cwd(), packageJson.packageManager.packagesDirectory)
);
