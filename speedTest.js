require('dotenv').config();
const fs = require('fs');
const speedTest = require('speedtest-net');
const moment = require('moment');

// time test was ran
const timestamp = new Date().getTime();
// CSV file name
const fileName = moment(timestamp).format(process.env.MOMENT_FORMAT) + process.env.FILE_NAME;
// Where CSV files get stored
const filePath = `${process.env.REPORT_PATH}/${fileName}`;

// Run test
const runTest = speedTest({maxTime: process.env.MAXTIME});

/**
 * When data received data write to csv or create new csv
 * @param  {Object} data Response from speed test
 */
const onData = function(data) {
	let download = data.speeds.download;
	let upload = data.speeds.upload;
	let csvLine = `${timestamp},${download},${upload}\n`;
	
	fs.stat(filePath, (err, stats)=>{
		if (!!err) {
			WriteNew(csvLine)
		} else {
			WriteTo(csvLine)
		}
	})
}
/**
 * Simple error Loggin function
 * @param  {String} err Descrive error
 */
const onError = function (err) {
	console.error(err);
	process.exit(1);
}

/**
 * Append test data to existing file
 * @param {String} csvLine timestamp,download,upload values
 */
const WriteTo = function (csvLine) {
	console.log(WriteTo)
	fs.appendFile(filePath, csvLine, onError);
	process.exit(0);
}

/**
 * Create new scv file with header and values
 * @param {String} csvLine timestamp,download,upload values
 */
const WriteNew = function (csvLine) {
	console.log(WriteNew)
	let csvData = 'timestamp,download,upload\n';
	csvData += csvLine;
	fs.writeFile(filePath, csvData, onError);
	process.exit(0);
}

// Received data call back
runTest.on('data', onData);
// error callback
runTest.on('error', onError);