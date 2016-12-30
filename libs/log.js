require('dotenv').config();

const moment = require('moment');
const fs = require('fs');

module.exports = (msg)=>{
	const format = 'YY-MM-DD - HH:mm:ss.SSS';
	const timestamp = moment().format(format);
	const msgString = `[${timestamp}] ${msg}\n`;
	
	console.log(msgString);
	return fs.appendFileSync(process.env.REPORT_PATH + '/logs.log', msgString);
}