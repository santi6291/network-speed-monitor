require('dotenv').config();
const cron = require('node-schedule');

const SpeedTask = require('./libs/speedTest');
const EmailTask = require('./libs/email');
const log = require('./libs/log');

log('Setting: speedCron');
const speedCron = cron.scheduleJob(process.env.CRON_SPEED_TEST_SCHEDULE, ()=>{
	log('cron stask - SpeedTask');
	new SpeedTask();
});

log('Setting: emailCron');
const emailCron = cron.scheduleJob(process.env.CRON_EMAIL_RESULTS_SCHEDULE, ()=>{
	log('cron stask - EmailTask');
	new EmailTask();
})
