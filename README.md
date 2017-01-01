# Network Speed test

Get what you pay, Periodic network speed check to average your networks performance.

## Installing

recommended to install on continuously running device like Raspberry-Pi etc, 

Clone

```bash
>$ git clone git@github.com:santi6291/network-speed-tester.git
```

This project is using [dotenv](https://www.npmjs.com/package/dotenv) to keep all credentials and configurations private and easily assessable 

```
cp .env-example .env
```

run `npm install`, this will install dependencies
 
Due to consistency issues using built in `crontab` to run crons here are sample crons

```
0 */1 * * * /home/pi/network-speed-tester/index.js > /home/pi/network-speed-tester/logs/speed-test-stdout.log 2>/home/pi/network-speed-tester/logs/speed-test-stderr.log
0 0 1 */1 * /home/pi/network-speed-tester/index.js --email > /home/pi/network-speed-tester/logs/email-stdout.log 2>/home/pi/network-speed-tester/logs/email-stderr.log
```

## Goal
I often get very frustrated when my network is not performing to what I'm paying. The goal is to have analytics and get your internet provider to step up their game or get some $$ back :) 

## Breakdown

There are four main components **dotenv**, **cron job**, **email reports**, and **network test**,

### [dotenv](https://www.npmjs.com/package/dotenv)

All configuration and credential are kept in a `.env` file which is ignored, this is to ensure to private information is ever shared!


### [Cron Job](https://github.com/node-schedule/node-schedule)

node-schedule uses cron syntax but does not write cron jobs. To clarify if you run `>$ crontab -l` no new cron jobs will be written and terminating the forever task will stop the cron jobs

### Email Reports

Personally using [sendgrid API](https://github.com/sendgrid/sendgrid-nodejs), mainly since they allow 12K email for free per month and you don't have to worry about your email going to spam. feel free to open Pull Request for other mail service integrations

### Network test
using [speedtest-net](https://github.com/ddsol/speedtest.net) to run network test as of v1.0 we are only checking for download and upload speeds. There is other network information available which I did not find important.
