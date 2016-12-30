require('dotenv').config();
const argv = require('yargs').argv;

const SpeedTask = require('./libs/speedTest');
const EmailTask = require('./libs/email');
 
if (argv.email) {
	new EmailTask();
} else {
	new SpeedTask();
}