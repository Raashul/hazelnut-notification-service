'use strict';
const response = require(__base + '/app/modules/common/response');
const sendEmailModule = require(__base + '/app/modules/email/send');

const getImage = require(__base + '/app/modules/common/getImage');

// module.exports.sendNotification = async (req, res) => {
//   try {
//     const { email, bucket_name, content, type, post_id, user_id } = req.body;
//     let response_body = { email, bucket_name, content, type };

//     const template = await sendEmailModule.selectTemplate(
//       req.request_id,
//       response_body
//     );
//     if (template.template_type === 'image') {
//       let image_url = await getImage.getImageForPost({ user_id, post_id });
//       response_body.image_url = image_url;
//     } else {
//       response_body.image_url = null;
//     }

//     response_body.template = template.template_id;
//     await sendEmailModule.callSES(req.request_id, response_body);

//     response.success(req.request_id, { success: 'Sent email' }, res);
//   } catch (e) {
//     response.failure(req.request_id, { error: { message: e.message } }, res);
//   }
// };

module.exports.sendNotification =  async (req, res)  => {
  try {
    const { email, bucket_name, content, type, post_id, user_id } = req.body;
    let response_body = { email, bucket_name, content, type };
    let subject = '';

    const template = await sendEmailModule.selectTemplate(
      req.request_id,
      response_body
    );

    if (template.template_type === 'image') {
      let image_url = await getImage.getImageForPost({ user_id, content });
      subject = `Image from ${bucket_name}`
      response_body.image_url = image_url;
    } else {
      const partOfStr = content.substring(0,15) + "....";
      subject = `${bucket_name}: ${partOfStr}`
      response_body.image_url = null;
    }
    response_body.subject = subject;
    response_body.template = template.template_id;
    await sendEmailModule.callSendGrid(req.request_id, response_body);

    response.success(req.request_id, { success: 'Sent email' }, res);
  } catch (e) {
    response.failure(req.request_id, { error: { message: e.message } }, res);
  }
}