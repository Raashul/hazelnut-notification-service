'use strict';
const uuidv4 = require('uuid/v4');
const response = require(__base + '/app/modules/common/response');
const bot = require(__base + '/app/modules/common/telegramBot');

const marketingModule = require(__base + '/app/modules/email/marketing');


module.exports.facebookCampaign =  async (req, res)  => {
  try {
    req.request_id = uuidv4();
    const { emails } = req.body;
    await marketingModule.sendFacebookCampaignNotification(req.request_id, {emails});
    bot.send(req.request_id, `Facebook campaign email sent to ${emails.length} people - ${req.request_id}`);

    response.success(req.request_id, { success: 'Sent email' }, res);
  } catch (e) {
    console.log(e);
    response.failure(req.request_id, { error: { message: e.message } }, res);
  }
}

module.exports.booksForYouCampaign =  async (req, res)  => {
  try {
    req.request_id = uuidv4();
    const { emails } = req.body;

    await marketingModule.sendBooksForYouCampaignNotification(req.request_id, {emails});
    bot.send(req.request_id, `Books for you  email sent to ${emails.length} people - ${req.request_id}`);

    response.success(req.request_id, { success: 'Sent email' }, res);
  } catch (e) {
    console.log(e);
    response.failure(req.request_id, { error: { message: e.message } }, res);
  }
}

module.exports.day1ReferReminderEmail =  async (req, res)  => {
  try {
    req.request_id = uuidv4();
    const { email, refer_code } = req.body;

    await marketingModule.sendDay1ReferReminderEmail(req.request_id, {email, refer_code});
    bot.send(req.request_id, `Refer day 1 reminder email sent - ${req.request_id}`);

    response.success(req.request_id, { success: 'Sent email' }, res);
  } catch (e) {
    console.log(e);
    response.failure(req.request_id, { error: { message: e.message } }, res);
  }
}