require('dotenv').config();
const cron = require('node-schedule');

const SpeedTask = require('./libs/speedTest');
const EmailTask = require('./libs/email');

const speedCron = cron.scheduleJob(process.env.CRON_SPEED_TEST_SCHEDULE, ()=>{
	console.log('cron stask - SpeedTask');
	new SpeedTask();
})
const emailCron = cron.scheduleJob(process.env.CRON_EMAIL_RESULTS_SCHEDULE, ()=>{
	console.log('cron stask - EmailTask');
	new EmailTask();
})
