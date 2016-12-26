const moment = require('moment');

module.exports = (msg)=>{
	const format = 'YY-MM-DD - HH:mm:ss.SSS';
	const timestamp = moment().format(format);
	return console.log(`[${timestamp}] `, msg);
}