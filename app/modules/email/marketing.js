
const config = require(__base + '/app/config/config');
const sgMail = require('@sendgrid/mail');
const logger = require(__base + '/app/modules/common/logger');


module.exports.sendFacebookCampaignNotification = (request_id, payload) => {
  return new Promise(async (resolve, reject) => {
    logger.info('sendFacebookCampaignNotification' + payload.emails.length + ' people');
    try {
      const msg = {
        to: payload.emails,
        from: config.email.from,
        templateId: config.sendgrid.facebook_campaign_email_template,
        // dynamic_template_data: {
        //   email: payload.email,
        //   link: `www.gethazelnut.com/${payload.refer_code}`
        // }
      };      
      sgMail.setApiKey(config.sendgrid.api_key);
      logger.debug(request_id, JSON.stringify(msg));

      sgMail.sendMultiple(msg, function(err, data) {
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


module.exports.sendBooksForYouCampaignNotification = (request_id, payload) => {
  return new Promise(async (resolve, reject) => {
    logger.info('sendBooksForYouCampaignNotification' + payload.emails.length + ' people');
    try {
      const msg = {
        to: payload.emails,
        from: config.email.from,
        templateId: config.sendgrid.books_for_you_email_template,
        // dynamic_template_data: {
        //   email: payload.email,
        //   link: `www.gethazelnut.com/${payload.refer_code}`
        // }
      };      
      sgMail.setApiKey(config.sendgrid.api_key);
      logger.debug(request_id, JSON.stringify(msg));

      sgMail.sendMultiple(msg, function(err, data) {
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

module.exports.sendDay1ReferReminderEmail = (request_id, payload) => {
  return new Promise(async (resolve, reject) => {
    logger.info('sendDay1ReferReminderEmail');
    try {
      let refer_link = 'https://hazelnut-web.herokuapp.com/landing'
      if(payload.refer_code) {
        refer_link = `https://hazelnut-web.herokuapp.com/referral/${payload.email}/${payload.refer_code}`
      }
      const msg = {
        to: payload.email,
        from: config.email.from,
        templateId: config.sendgrid.day1_refer_reminder_email_template,
        dynamic_template_data: {
          refer_link
        }
      };      
      sgMail.setApiKey(config.sendgrid.api_key);
      logger.debug(request_id, JSON.stringify(msg));

      sgMail.sendMultiple(msg, function(err, data) {
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