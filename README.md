Description:  

A node.js microservice used to send marketing emails, referral emails and other regular application specific emails (forgot password, introduction email, signup email etc )  
 


Add `.env` file in root path.

To start server:

`npm start`


Updating template for post with image
aws ses update-template --cli-input-json file://app/tmp/reminder-email-image.json

Updating template for post with image
aws ses update-template --cli-input-json file://app/tmp/reminder-email-text.json



