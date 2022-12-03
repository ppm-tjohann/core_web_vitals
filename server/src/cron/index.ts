import { CronPageRater } from './PageRatings'
import { getTimestamp } from '../lib/getTimestamp'



const CronJob = require( 'cron' ).CronJob
const job = new CronJob(
  // runs every five minutes
  '*/10 * * * * *',

  // run every second
  //'* * * * * *',

  function() {
      CronPageRater()
      //getTimestamp()
  }

  ,
  null,
  true,
  'America/Los_Angeles',
)

export default job
