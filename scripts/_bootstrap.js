/**
 * Boostrap packages using lerna
 */
'use strict';

const spawn = require('child_process').spawn;

function bootstrap() {
	return new Promise((resolve, reject) => {
		const lerna = spawn('node_modules/.bin/lerna', ['bootstrap'], {stdio: 'inherit'});

		lerna.on('error', error => {
			reject(new Error(error));
		});

		lerna.on('exit', code => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`lerna bootstrap process exited with code ${code}`));
			}
		});
	});
}

module.exports = bootstrap;
