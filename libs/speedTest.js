require('dotenv').config();
const fs = require('fs');
const speedTest = require('speedtest-net');
const moment = require('moment');

const log = require(process.env.PROJECT_ROOT+'/log');

class SpeedTest{
	constructor(){
		log('SpeedTest - Starting network Speed Test');
		this.csvheader = 'timestamp,download,upload\n';
		// time test was ran
		this.timestamp = moment()//new Date().getTime();
		// CSV file name
		this.fileName = this.timestamp.format(process.env.MOMENT_FORMAT) + process.env.FILE_NAME;
		// Where CSV files get stored
		this.filePath = `${process.env.REPORT_PATH}/${this.fileName}`;
		// Run test
		this.runTest = speedTest({maxTime: process.env.MAXTIME});

		// Received data call back
		this.runTest.on('data', data=>this.onData(data));
		// error callback
		this.runTest.on('error', error=>this.onError(error));
	}

	csvString(data){
		const unix = this.timestamp.format('x');
		return `${unix},${data.download},${data.upload}\n`
	}
	
	/**
	 * When data received data write to csv or create new csv
	 * @param  {Object} data Response from speed test
	 */
	onData(data) {
		let csvLine = this.csvString({
			download: data.speeds.download,
			upload: data.speeds.upload
		}) 
		
		fs.stat(this.filePath, (err, stats)=>{
			if (!!err) {
				this.writeNew(csvLine)
			} else {
				this.writeTo(csvLine)
			}
		})
	}
	
	/**
	 * Simple error Loggin function
	 * @param  {String} err Descrive error
	 */
	onError(err) {
		if (!!err) throw err;
		// TODO email/log error
	}

	/**
	 * Append test data to existing file
	 * @param {String} csvLine timestamp,download,upload values
	 */
	writeTo (csvLine) {
		log('SpeedTest - Appending to CSV file');
		fs.appendFile(this.filePath, csvLine, err=>{
			this.onError(err);
			log('SpeedTest - Finished');
		});
	}

	/**
	 * Create new scv file with header and values
	 * @param {String} csvLine timestamp,download,upload values
	 */
	writeNew (csvLine) {
		log('SpeedTest - Creating new CSV file');
		this.csvheader += csvLine;
		fs.writeFile(this.filePath, this.csvheader, err=>{
			this.onError(err);
			log('SpeedTest - Finished');
		});
	}
}

module.exports = SpeedTest