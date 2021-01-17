// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
const config = require(__base + '/app/config/config');
const logger = require(__base + '/app/modules/common/logger');
const sgMail = require('@sendgrid/mail');

// const template_path = require(__base + '/app/tmp');

module.exports.selectTemplate = (request_id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let template = '';
      if (data.type === 'image') {
        resolve({
          template_id: config.sendgrid.email_image_template_id,
          template_type: 'image'
        });
      } else if (data.type === 'text') {
        resolve({
          template_id: config.sendgrid.email_text_template_id,
          template_type: 'text'
        });
      } else {
        reject({ code: 103.1, custom_message: 'Incorrect type passed.' });
      }
    } catch (e) {
      reject({ code: 103, message: { message: e.message, stack: e.stack } });
    }
  });
};

// module.exports.callSES = (request_id, data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Set the region
//       AWS.config.update({
//         accessKeyId: config.aws.ses.access_key,
//         secretAccessKey: config.aws.ses.secret_key,
//         region: config.aws.ses.region
//       });

//       const { content, bucket_name, email, type, template, image_url } = data;
//       let templateData = {};
//       if (type === 'image') {
//         templateData = {
//           content,
//           bucket_name,
//           image_src: image_url
//         };
//       } else {
//         templateData = {
//           content,
//           bucket_name
//         };
//       }

//       let params = {
//         Source: config.aws.email.from,
//         Template: template,
//         // "ConfigurationSetName": "ConfigSet",
//         Destination: {
//           ToAddresses: [data.email]
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

module.exports.callSendGrid = (request_id, data) => {
  return new Promise( async (resolve, reject) => {
    try {

      const msg = {
        to: data.email,
        from: config.email.from,
        templateId: data.template,
        dynamic_template_data: {
          subject: data.subject,
          bucket_name: data.bucket_name,
          content: data.type === 'text' ? data.content: '',
          image_url : data.type === 'image' ? `${data.image_url}`: null
        },
      };

      
      sgMail.setApiKey(config.sendgrid.api_key);

      // logger.debug(request_id, JSON.stringify(msg));

      sgMail.send(msg, function(err, data) {
        console.log(err, null)
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