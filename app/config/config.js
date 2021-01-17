'use strict';

module.exports = {
  app: {
    port: process.env.PORT || 3001,
    environment: process.env.ENVIRONMENT || 'local'
  },
  mysql: {
    provisioning_db_host: process.env.MYSQL_PROVISIONING_DB_HOSTNAME,
    provisioning_db_port: process.env.MYSQL_PROVISIONING_DB_PORT,
    provisioning_db_username: process.env.MYSQL_PROVISIONING_DB_USERNAME,
    provisioning_db_password: process.env.MYSQL_PROVISIONING_DB_PASSWORD,
    provisioning_db_database: process.env.MYSQL_PROVISIONING_DB_DATABASE,

    max_conn_limit: process.env.MYSQL_MAX_CONN_LIMIT
  },
  telegram: {
    bot: process.env.TELEGRAM_WEBHOOK_URL
  },
  services: {
    refer: process.env.REFER_SERVICE_HOST,
  },

  aws: {
    s3: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      postImageBucket: process.env.POST_IMAGE_BUCKET,
      postImageBucketLocation: process.env.POST_IMAGE_BUCKET_LOCATION
    },
    ses: {
      access_key: process.env.AWS_SES_ACCESS_KEY,
      secret_key: process.env.AWS_SES_SECRET_ACCESS_KEY,
      region: process.env.AWS_SES_REGION,
      api_version: process.env.AWS_API_VERSION
    },
    email: {
      from: process.env.FROM_EMAIL,
      template: process.env.AWS_SES_TEMPLATE,
      templateImage: process.env.AES_SES_REMINDER_EMAIL_IMAGE_TEMPLATE,
      templateText: process.env.AES_SES_REMINDER_EMAIL_TEXT_TEMPLATE
    }
  },
  email: {
    from: process.env.FROM_EMAIL
  },
  jwt: {
    cert: process.env.JWT_TOKEN_CERT
  },
  sendgrid: {
    email_text_template_id: process.env.EMAIL_TEXT_TEMPLATE_ID,
    email_image_template_id: process.env.EMAIL_IMAGE_TEMPLATE_ID,
    forgot_password_template_id: process.env.FORGOT_PASSWORD_TEMPLATE_ID,
    welcome_email_template: process.env.WELCOME_EMAIL_TEMPLATE,
    share_email_template: process.env.SHARE_EMAIL_TEMPLATE,
    api_key: process.env.SENDGRID_API_KEY,
    facebook_campaign_email_template: process.env.FACEBOOK_CAMPAIGN_EMAIL_TEMPLATE,
    books_for_you_email_template: process.env.BOOKS_FOR_YOU_EMAIL_TEMPLATE,
    day1_refer_reminder_email_template: process.env.DAY_1_REFER_REMINDER_EMAIL
  }
};
