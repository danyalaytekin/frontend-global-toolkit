#! /usr/bin/env node

const path = require('path');

const createPackage = require(path.resolve(__dirname, './_create-package'));

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageJson = require(packageJsonPath);

createPackage(
	path.resolve(process.cwd(), packageJson.packageManager.validationPath),
	packageJsonPath,
	path.resolve(process.cwd(), packageJson.packageManager.packagesDirectory)
);
