require('dotenv').config();

// const cron = require('node-schedule');
const CronJob = require('cron').CronJob;

const SpeedTask = require('./libs/speedTest');
const EmailTask = require('./libs/email');
const log = require('./libs/log');
 
const timezone = 'America/New_York';

/*log('Setting: speedCron');
const speedCron = cron.scheduleJob(process.env.CRON_SPEED_TEST_SCHEDULE, ()=>{
	log('cron stask - SpeedTask');
	new SpeedTask();
});

log('Setting: emailCron');
const emailCron = cron.scheduleJob(process.env.CRON_EMAIL_RESULTS_SCHEDULE, ()=>{
	log('cron stask - EmailTask');
	new EmailTask();
})
*/

log('Setting: speedCron');
const speedCron = new CronJob(process.env.CRON_SPEED_TEST_SCHEDULE, ()=> {
	log('cron stask - SpeedTask');
	new SpeedTask();
  },
  null, /* Call bacl after cron is finished */
  true, /* Start the job right now */
  timezone /* Time zone of this job. */
);

log('Setting: emailCron');
const emailCron = new CronJob(process.env.CRON_EMAIL_RESULTS_SCHEDULE, ()=> {
	log('cron stask - EmailTask');
	new EmailTask();
  },
  null, /* Call bacl after cron is finished */
  true, /* Start the job right now */
  timezone /* Time zone of this job. */
);
