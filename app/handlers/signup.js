'use strict';
const response = require(__base + '/app/modules/common/response');
const sendEmailModule = require(__base + '/app/modules/email/signup');

module.exports.sendNotification =  async (req, res)  => {
  try {
    const { email, user_id } = req.body;
    await sendEmailModule.validation(req.request_id, {user_id});
    await sendEmailModule.callSendGrid(req.request_id, {email});

    response.success(req.request_id, { success: 'Sent email' }, res);
  } catch (e) {
    response.failure(req.request_id, { error: { message: e.message } }, res);
  }
}