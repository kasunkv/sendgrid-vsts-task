![Visual Studio Team Services](https://kasunkodagoda.visualstudio.com/_apis/public/build/definitions/a6819d70-02f9-4711-8ff6-ae44bb52a8d1/34/badge)
[![Visual Studio Marketplace](https://img.shields.io/badge/Visual%20Studio%20Marketplace-install-brightgreen.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=kasunkodagoda.sendgrid-email)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/kasunkv/sendgrid-vsts-task/blob/master/LICENSE.md)
# SendGrid Email Task
SendGrid Email Task for Visual Studio Team Services to send emails from a build/release definition

## Prerequisites
* You need to have a SendGrid Account created with an appropriate plan. You can learn more about SendGrid from the [SendGrid Official Website](https://sendgrid.com/pricing/).
* Obtain the API Key required to access the SendGrid API by following the instructions on the [Official Documentation](https://app.sendgrid.com/settings/api_keys).

### Add the SendGrid Email Task
Install the SendGrid Email Task in to your Visual Studio Team Services account and search for the task in the available tasks. The task will appear in the _Utility_ section of the task list. Add it to your build/release task.

![Add SendGrid Email Task](https://raw.githubusercontent.com/kasunkv/sendgrid-vsts-task/master/screenshots/screenshot-1.png)

## Configure SendGrid Section
Configure SendGrid section has one required configuration you need to set.

### Available Options
* **SendGrid API Key** : API Key given by SendGrid. You can generate an API Key from the [SendGrid Portal](https://app.sendgrid.com/settings/api_keys) _*(Required)*_

## Email Details Section
Email Details section has 4 required configuration you need to set. _Sender Email Address, To Address(s), Subject and Email Body_

### Available Options
* **Sender Email Address** : Email address of the sender. The value can either be only the *Email Address* _(Eg. john@example.com)_ or the *Name* and the *Email Address* _(Eg. John Smith <john@example.com>)_ _*(Required)*_
* **Recipient Email Addresses** : Email address(s) of the recipient(s). Use a comma (,) separated list if you have multiple email addresses. _(Eg. john@example.com, bob@example.com)_. The email addresses can either be only the *Email Address* _(Eg. john@example.com)_ or the *Name* and the *Email Address* _(Eg. John Smith <john@example.com>)_ _*(Required)*_
* **Subject** : Subject of the email. _*(Required)*_
* **Email Body** : Contents of the email you want to send.To send HTML body add the HTML here and set the _Send as HTML_ checkbox. _*(Optional)*_
* **Send as HTML** : Check this option if you want to send the contents of the email body as HTML. _*(Optional)*_

![Configure SendGrid Email Task](https://raw.githubusercontent.com/kasunkv/sendgrid-vsts-task/master/screenshots/screenshot-2.png)