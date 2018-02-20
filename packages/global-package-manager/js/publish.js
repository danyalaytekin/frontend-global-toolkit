#! /usr/bin/env node

const path = require('path');

const publishPackages = require('./_publish');
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
						publishPackages(config.packagesDirectory, config.changelog);
					})
					.catch(err => {
						exitScript.displayErr(err);
					});
			})
			.catch(err => {
				exitScript.displayErr(err);
			});
	});
