'use strict';
const share = require(__base + '/app/modules/email/share');
const response = require(__base + '/app/modules/common/response');

module.exports.sendNotification = async (req, res) => {
  const { emails, url, sharingUser } = req.body;
  try {
    await share.sendEmail(req.request_id, emails, url, sharingUser);
    response.success(req.request_id, { success: 'Sent email' }, res);
  } catch (e) {
    response.failure(req.request_id, e, res);
  }
};
