// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const validator = require('validator');
const config = require(__base + '/app/config/config');
const logger = require(__base + '/app/modules/common/logger');
const sgMail = require('@sendgrid/mail');

module.exports.validation = (request_id, response_body) => {
  return new Promise((resolve, reject) => {
    if(validator.isUUID(response_body.user_id)){
      logger.info(request_id, response_body.user_id);
      resolve();
    } else {
      reject({ code: 103, message: 'Attributes validation incorrect. Not UUID' });
    }
  })
}


module.exports.callSendGrid = (request_id, data) => {
  return new Promise( async (resolve, reject) => {
    try {
      const msg = {
        to: data.email,
        from: config.email.from,
        templateId: config.sendgrid.welcome_email_template
      };
   
      
      sgMail.setApiKey(config.sendgrid.api_key);

      // logger.debug(request_id, JSON.stringify(msg));

      sgMail.send(msg, function(err, data) {
        if (err) {
          console.log('err',err);
          reject({ code: 400, message: { message: err.message, stack: err.stack } });
        }
        else {
          logger.debug(request_id, JSON.stringify(data));
          resolve();
        }
      });

    } catch(e) {
      reject({ code: 400, message: { message: e.message, stack: e.stack } });
    }
  });
}