require('dotenv').config();
const SpeedTask = require('./speedTest');
const EmailTask = require('./email');
const CronJobManager = require('cron-job-manager');

var manager = new CronJobManager();
manager.add(process.env.CRON_SPEED_TEST_KEY, process.env.CRON_SPEED_TEST_SCHEDULE, ()=>new SpeedTask())
manager.start(process.env.CRON_SPEED_TEST_KEY)

// manager.add(process.env.CRON_EMAIL_RESULTS_KEY, process.env.CRON_EMAIL_RESULTS_SCHEDULE, ()=>new speedTest())
// manager.start(process.env.CRON_EMAIL_RESULTS_KEY)

console.log(manager.listCrons())
