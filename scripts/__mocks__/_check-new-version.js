/**
 * __mocks__/_check-new-version.js
 * Mock returning a valid version
 */
'use strict';

const result = {
	'fec-package': '3.0.0',
	'fec-match': '2.0.0',
	'fec-older': '1.0.0',
	'fec-none': '0.0.0'
};

const checkNewVersion = pkg => result[pkg.name];

module.exports = checkNewVersion;
