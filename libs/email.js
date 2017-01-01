require('dotenv').config({path: __dirname+'/../.env'});

const fs = require('fs');
const moment = require('moment');
const helper = require('sendgrid').mail;

const log = require(process.env.PROJECT_ROOT+'/libs/log');

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

class CsvToJson{
	constructor(data){
		this.rows = data.split('\n');
		this.data = [];
		this.rows.forEach((row, index)=>this.makeJson(row, index), this);
	}

	makeJson(row, index){
		let cols = row.split(',');
		
		if(index == 0){
			this.keys = cols
			return;
		}

		if(cols[0] != ''){
			this.addToData(cols);
		}
	}

	addToData(cols){
		let rowObj = {};
		cols.forEach((val, index)=>{
			let key = this.keys[index];
			rowObj[key] = val 
		});
		this.data.push(rowObj);
	}
	
	getData(){
		return this.data;
	}
}

class EmailResults {
	constructor(){
		log('EmailResults - Starting');
		this.currentTime = moment();
		this.lastMonth = this.currentTime.subtract(1, 'month');
		this.fileName = this.lastMonth.format(process.env.MOMENT_FORMAT) + process.env.FILE_NAME;
		// Where CSV files get stored
		this.filePath = `${process.env.PROJECT_ROOT}${process.env.REPORT_PATH}/${this.fileName}`;
		this.results;
		this.downloadAvg = 0;
		this.uploadAvg = 0;
		
		fs.readFile(this.filePath, (err, data) => this.getFileCB(err, data));

	}

	getFileCB(err, data){
		if (err) {
			this.noFile(err)
			return
		} 
		let csvJson = new CsvToJson(data.toString())
		this.results = csvJson.getData();
		this.doAverages();
	}

	noFile(err){
		log(err.toString());
	}

	doAverages(){
		this.results.forEach(val=>{
			this.downloadAvg += Number(val.download);
			this.uploadAvg += Number(val.upload);
		});
		
		this.downloadAvg = (this.downloadAvg/this.results.length).toFixed(2);
		this.uploadAvg = (this.uploadAvg/this.results.length).toFixed(2);
		
		this.sendEmail();
	}

	sendEmail(){
		log('EmailResults - Sending Email');
		let from_email = new helper.Email(process.env.SENDGRID_FROM_EMAIL);
		let to_email = new helper.Email(process.env.SENDGRID_TO_EMAIL);
		let subject = 'Network Statistics - ' + this.lastMonth.format('YYYY - MM');
		
		let content = new helper.Content('text/html', this.emailContent());
		let mail = new helper.Mail(from_email, subject, to_email, content);

		const request = sg.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: mail.toJSON(),
		});

		sg.API(request, (error, response)=>{
			if (error) throw error;
			log('EmailResults - Email Sent');
		});
	}

	emailContent(){
		return`<h3>Network Performance for ${this.lastMonth.format('YYYY - MM')}</h3>
		<p>
			<strong>Download</strong>: ${this.downloadAvg}/${process.env.DOWNLOAD_SPEED} = ${this.downloadAvg/process.env.DOWNLOAD_SPEED*100}%
		</p>
		<p>
			<strong>Upload</strong>: ${this.uploadAvg}/${process.env.UPLOAD_SPEED}  = ${this.uploadAvg/process.env.UPLOAD_SPEED*100}%\n
		</p>`;
	}
}

module.exports = EmailResults