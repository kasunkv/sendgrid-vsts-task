import * as Task from 'vsts-task-lib';
import * as path from 'path';
import SendGrid = require('@sendgrid/mail'); // tslint:disable-line

import { MailData } from '@sendgrid/helpers/classes/mail'; 
import { ResponseError } from '@sendgrid/helpers/classes';
import { Helper } from './helper';

Task.setResourcePath(path.join(__dirname, 'task.json'));

async function run(): Promise<void> {
    const sendGridApiKey: string = Task.getInput('SendGridApiKey', true);
    const fromAddress: string = Task.getInput('FromAddress', true);
    let toAddresses: string[] = Task.getDelimitedInput('ToAddresses', ',', true);
    const emailSubject: string = Task.getInput('Subject', true);
    const emailBody: string = Task.getInput('EmailBody', true);
    const sendAsHtml: boolean = Task.getBoolInput('SendAsHTML');

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

    if (sendAsHtml) {
        emailData.html = emailBody;
    } else {
        emailData.text = emailBody;
    }

    Task.debug(`MailData: ${JSON.stringify(emailData)}`);

    SendGrid
        .sendMultiple(emailData)
        .then(() => {
            const message: string = `
                Email(s) sent to following address(s):
                    Recipients: ${toAddresses.toString()}
            `;
            
            Helper.WriteConsoleInformation(message);
            Task.setResult(Task.TaskResult.Succeeded, message);
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
            Task.setResult(Task.TaskResult.Failed, errMessage);
        });
}

run();