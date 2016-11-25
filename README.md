# Network Speed test

## Files

```
|____ cron.js      -> (un)install cron task
|____ speedTest.js -> Check network speed
|____ email.js     -> Compile report and send email (maybe use third party service)
|____ results      -> Store monthly csv
|____.env          -> store app variables
|________ YYMM-report.csv -> 1612-report.csv, this format enable better sorting
```

## Install

1. Set cron task
	1. check speed every 4 hours
	2. email results monthly
2. Create .env file

## speed Test

1. Run speed test
2. check upload, download, ping
3. write results to CSV
	1. cols: 
		1. unix timestamp
		2. upload
		3. download
	2. split files into months

## Email

1. Average results
2. Compare to expected up/down load speed (.env)
3. send using third party email service