const aws = require('aws-sdk');
const AWS = require('aws-sdk');

const s3 = require(__base + '/app/init/aws').getS3();
const config = require(__base + '/app/config/config');

module.exports.getImageForPost = (data) => {
  return new Promise(async (resolve, reject) => {
    const { post_id, user_id, content } = data;
    const params = {
      Bucket: config.aws.s3.postImageBucket,
      Key: `thumbnail/${user_id}/${content}`
    };
    try {
      
      s3.getSignedUrl('getObject', params, function(err, url){
        if(err) {
          console.log(err);
          reject({ code: 103, custom_message: 'Some issue with this user' })
        }
        else {
          console.log('url here at base------', url);
          resolve(url);     
        }
      });
    } catch(e) {
      reject({ code: 103, message: { message: e.message, stack: e.stack } });
    }

  })
}
