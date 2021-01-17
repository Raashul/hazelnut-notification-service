// Load the AWS SDK for Node.js
const config = require(__base + '/app/config/config');
const logger = require(__base + '/app/modules/common/logger');
const sgMail = require('@sendgrid/mail');

module.exports.sendEmail = (request_id, emails, url, sharingUser) => {
  return new Promise(async (resolve, reject) => {
    email = emails.map(email => {
      return { email };
    });
    try {
      const msg = {
        to: email,
        from: config.email.from,
        templateId: config.sendgrid.share_email_template,
        dynamic_template_data: {
          email: sharingUser,
          link: url
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
