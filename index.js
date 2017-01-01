#!/usr/bin/env node
require('dotenv').config();
#!/usr/bin/env /usr/local/bin/node
const argv = require('yargs').argv;

const log = require(process.env.PROJECT_ROOT+'/libs/log');

const SpeedTask = require(process.env.PROJECT_ROOT+'/libs/speedTest');
const EmailTask = require(process.env.PROJECT_ROOT+'/libs/email');
 
log('Cron executing');
if (argv.email) {
	new EmailTask();
} else {
	new SpeedTask();
}