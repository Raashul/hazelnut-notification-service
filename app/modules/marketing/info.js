'use strict';

// const axios = require('axios');
const config = require(__base + '/app/config/config');
const logger = require(__base + '/app/modules/common/logger');

const mysql = require(__base + '/app/modules/common/mysql');

const db = 'provisioning';


module.exports.getFacebookEmailList = (request_id, payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = 'SELECT * from marketing WHERE is_facebook_email_sent = ? AND created_at < ? ';
      const { facebook_email_schedule } = payload;

      let results = await mysql.query(request_id, db, queryString, [0, facebook_email_schedule]);
      console.log('resuls', results);
      if(results.length >= 1) {
        resolve(results);
      } else {
        resolve([]);
      }
    } catch(e) {
      console.log(e);
      reject({ code: 102, message: 'Internal Server Error' });
    }
  })

}