'use strict'

const fs = require('fs');
const dateTime = require('node-datetime');

class FileLog {
	constructor(verbose) {
		this.verbose = verbose;
		this.log('INFO', 'MODULE_CUSTOM', 'FileLog, Constructing new FileLog object');
	}

	log(type, category, message) {
		var logText = type + ' | ' + dateTime.create().format('Y-m-d H:M:S') + ' | ' + category + ' | ' + message;
		if (this.verbose) {
			console.log(logText);
		}
		fs.appendFileSync('logs/' + type, logText + '\n');
	}
}

module.exports = FileLog;