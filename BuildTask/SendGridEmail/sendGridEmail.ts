import * as Task from 'vsts-task-lib';
import * as path from 'path';
import * as fs from 'fs';
import SendGrid = require('@sendgrid/mail'); // tslint:disable-line

import { MailData } from '@sendgrid/helpers/classes/mail';
import { ResponseError } from '@sendgrid/helpers/classes';
import { Helper } from './helper';

Task.setResourcePath(path.join(__dirname, 'task.json'));

async function run(): Promise<string> {
    const promise = new Promise<string>(async (resolve, reject) => {

        try {
            const sendGridApiKey: string = Task.getInput('SendGridApiKey', true);
            const fromAddress: string = Task.getInput('FromAddress', true);
            let toAddresses: string[] = Task.getDelimitedInput('ToAddresses', ',', true);
            const emailSubject: string = Task.getInput('Subject', true);
            const sendAsHtml: boolean = Task.getBoolInput('SendAsHTML');
            const emailBodyFormat: string = Task.getInput('emailBodyFormat', true);
            const emailBody: string = Task.getInput('EmailBody', true);
            const emailBodyFile: string = Task.getInput('EmailBodyFile', true);

            Helper.WriteConsoleInformation(`FromAddress: [${fromAddress}]`);
            Helper.WriteConsoleInformation(`ToAddresses: [${toAddresses.join(', ')}]`);
            Helper.WriteConsoleInformation(`emailSubject: [${emailSubject}]`);
            Helper.WriteConsoleInformation(`sendAsHtml: [${sendAsHtml}]`);
            Helper.WriteConsoleInformation(`emailBodyFormat: [${emailBodyFormat}]`);
            Helper.WriteConsoleInformation(`emailBodyFile: [${emailBodyFile}]`);

            // Trim the email addresses in the array
            toAddresses = toAddresses.map((addr: string) => {
                return addr.trim();
            });

            SendGrid.setApiKey(sendGridApiKey);   

            const emailData: MailData = {
                from: fromAddress,
                to: toAddresses,
                subject: emailSubject
            };

            let emailBodyFinal: string;
            switch (emailBodyFormat.toLowerCase()) {
                case 'file':

                    if (!fs.existsSync(emailBodyFile)) {
                        reject(`Failed to locate the email file on disk ${emailBodyFile}`);
                        return;
                    }     
                    
                    emailBodyFinal = fs.readFileSync(emailBodyFile, 'utf8');

                    break;
                case 'inline':
                    emailBodyFinal = emailBody;
                    break;
                default:
                    emailBodyFinal = emailBody;
                    break;
            }

            if (sendAsHtml) {
                emailData.html = emailBodyFinal;
            } else {
                emailData.text = emailBodyFinal;
            }

            Task.debug(`MailData: ${JSON.stringify(emailData)}`);

            await SendGrid
            .sendMultiple(emailData)
            .then(() => {
                const message: string = `
                    Email(s) sent to following address(s):
                        Recipients: ${toAddresses.toString()}
                `;
                
                Helper.WriteConsoleInformation(message);
                resolve(message);
            }, err => {
                reject(err);
            })
            .catch((err: ResponseError) => {
                const errMessage: string = `
                    Failed to send the email(s)
                        Error Code: ${err.code}
                        Error Message: ${err.message}
                        Response Body: ${err.response.body}
                        Response Headers: ${err.response.headers}
                        Stack Trace: ${err.stack}
                `;

                Helper.WriteConsoleInformation(errMessage);
                reject(errMessage);            
            });
        } catch (err) {
            reject(err);
        }
    });
    return promise;
}

run()    
    .then(result => {
        Task.setResult(Task.TaskResult.Succeeded, result);
    })
    .catch(err => {
        Task.setResult(Task.TaskResult.Failed, err);
    });