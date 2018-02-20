#! /usr/bin/env node

const path = require('path');
const argv = require('yargs').argv;

const validatePackages = require('./_validate');
const exitScript = require('./_exit-script');
const exists = require('./_check-exists');
const configGenerator = require('./_generate-config');

const packageJsonPath = path.resolve(process.cwd(), 'package.json');

configGenerator('package-manager.json')
	.then(config => {
		exists.fileExists(packageJsonPath)
			.then(() => {
				exists.directoryExists(path.resolve(process.cwd(), config.packagesDirectory))
					.then(() => {
						validatePackages(packageJsonPath, config, argv.p);
					})
					.catch(err => {
						exitScript.displayErr(err);
					});
			})
			.catch(err => {
				exitScript.displayErr(err);
			});
	});
