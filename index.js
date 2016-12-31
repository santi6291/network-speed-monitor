require('dotenv').config();
const argv = require('yargs').argv;

const SpeedTask = require(process.env.PROJECT_ROOT+'/libs/speedTest');
const EmailTask = require(process.env.PROJECT_ROOT+'/libs/email');
 
log('Cron executed')
if (argv.email) {
	new EmailTask();
} else {
	new SpeedTask();
}