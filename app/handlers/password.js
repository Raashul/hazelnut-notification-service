const password = require(__base + '/app/modules/email/password');
const response = require(__base + '/app/modules/common/response');

module.exports.sendNotification = async (req, res) => {
  const { email, referral_code } = req.body;
  try {
    await password.callSES(req.request_id, email, referral_code);
    response.success(req.request_id, { success: 'Sent email' }, res);
  } catch (e) {
    response.failure(req.request_id, e, res);
  }
};
