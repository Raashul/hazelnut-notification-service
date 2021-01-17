'use strict';

const health = require(__base + '/app/handlers/health');
const route = require(__base + '/app/routes/config/constants');
const logger = require(__base + '/app/modules/common/logger');
const notification = require(__base + '/app/handlers/notification');
const password = require(__base + '/app/handlers/password');
const signup = require(__base + '/app/handlers/signup');
const share = require(__base + '/app/handlers/share');
const marketing = require(__base + '/app/handlers/marketing');

exports = module.exports = app => {
  // health checks
  app.get('/', (req,res) => res.send('Hello'))
  // app.get('/', health.check);
  app.get('/health', health.check);


  app.post(route.notification, notification.sendNotification);
  app.post(route.passwordNotification, password.sendNotification);
  app.post(route.signup, signup.sendNotification);
  app.post(route.share, share.sendNotification);

  app.post(route.facebookCampaign, marketing.facebookCampaign);

  app.post(route.booksForYouCampaign, marketing.booksForYouCampaign);

  app.post(route.day1ReferReminderEmail, marketing.day1ReferReminderEmail);

  logger.info(`Routes initialized.`);
};
