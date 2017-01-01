require('dotenv').config({path: __dirname+'/../.env'});

const moment = require('moment');
const fs = require('fs');

module.exports = (msg)=>{
	const format = 'YY-MM-DD - HH:mm:ss.SSS';
	const timestamp = moment().format(format);
	const msgString = `[${timestamp}] ${msg}`;
	
	console.log(msgString);
	// return fs.appendFileSync(`${process.env.PROJECT_ROOT}${process.env.LOGS_PATH}/logs.log`, msgString);
}