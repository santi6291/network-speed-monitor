require('dotenv').config();
const cron = require('node-schedule');

const SpeedTask = require('./speedTest');
const EmailTask = require('./email');

var manager = new CronJobManager();
const speedCron = cron.scheduleJob(process.env.CRON_SPEED_TEST_SCHEDULE, ()=>{
	console.log('SpeedTask');
	new SpeedTask();
})
const emailCron = cron.scheduleJob(process.env.CRON_EMAIL_RESULTS_SCHEDULE, ()=>{
	console.log('EmailTask');
	new EmailTask();
})
