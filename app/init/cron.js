// 'use strict';

// const moment = require('moment');
// const momentTZ = require('moment-timezone');
// const uuid = require('uuid/v4');
// const CronJob = require('cron').CronJob;

// const logger = require(__base + '/app/modules/common/logger');

// const marketingInfoModule = require(__base + '/app/modules/marketing/info');
// const marketingNotifications = require(__base + '/app/modules/secondary_services/marketing');

// const init = () => {
//   // const job = new CronJob('0 8,12,16,20 * * *', async function() {
//   const job = new CronJob('00 08 * * *', async function() {

//     logger.info('Initiating daily cron job');

//     const current_time = momentTZ().tz("America/New_York").format('YYYY-MM-DD');
//     const req = { request_id: uuid() };

//     console.log('current_time', current_time);

//     const payload = {
//       facebook_email_schedule: moment(current_time).subtract(3,'days').format("DD-MM-YYYY")
//     }
//     console.log('payload', payload);
    
//     const facebook_email_list = await marketingInfoModule.getFacebookEmailList(req, payload);
//     console.log('facebook_email', facebook_email_list);
//     if(facebook_email_list.length > 0) {
//       await marketingNotifications.facebookCampaign(req.request_id, {facebook_email_list});

//     }

//     logger.info('Ending background job');

//   },  null, true, 'America/New_York');
  
//   job.start();
// }

// init();