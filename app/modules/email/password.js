// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const config = require(__base + '/app/config/config');
const logger = require(__base + '/app/modules/common/logger');
const sgMail = require('@sendgrid/mail');

// const template_path = require(__base + '/app/tmp');

// module.exports.callSES = (request_id, email, new_password) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Set the region
//       AWS.config.update({
//         accessKeyId: config.aws.ses.access_key,
//         secretAccessKey: config.aws.ses.secret_key,
//         region: config.aws.ses.region
//       });

//       let templateData = { new_password };

//       let params = {
//         Source: config.aws.email.from,
//         Template: 'ForgotPassword',
//         Destination: {
//           ToAddresses: [email]
//         },
//         TemplateData: JSON.stringify(templateData)
//       };

//       const ses = new AWS.SES({ apiVersion: config.aws.ses.api_version });
//       await ses.sendTemplatedEmail(params, async (err, data) => {
//         logger.debug(request_id, `Sending email to ${email}`);
//         if (err) {
//           logger.error(request_id, err.message, err.stack, JSON.stringify(err));
//           reject({ code: 102, custom_message: err.message });
//         }
//         if (data) {
//           logger.debug(request_id, `Email successfully sent to: ${email}`);
//           resolve();
//         }
//       });
//     } catch (e) {
//       reject({ code: 102, message: { message: e.message, stack: e.stack } });
//     }
//   });
// };

module.exports.callSES = (request_id, email, referral_code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const msg = {
        to: email,
        from: config.email.from,
        templateId: config.sendgrid.forgot_password_template_id,
        dynamic_template_data: {
          email: email,
          referral_code: referral_code
        }
      };

      sgMail.setApiKey(config.sendgrid.api_key);

      logger.debug(request_id, JSON.stringify(msg));

      sgMail.send(msg, function(err, data) {
        console.log(err, null);
        if (err) {
          console.log('err', err);
          reject({
            code: 400,
            message: { message: err.message, stack: err.stack }
          });
        } else {
          logger.debug(request_id, JSON.stringify(data));
          resolve();
        }
      });
    } catch (e) {
      reject({ code: 400, message: { message: e.message, stack: e.stack } });
    }
  });
};
