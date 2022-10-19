const { sendDesirabilitySubmitted } = require('../senders')
const createMsg = require('./create-submission-msg')
const appInsights = require('../../services/app-insights')

const desirabilityScore = 'Strong'

module.exports = async function (msg) {
  try {
    const { body: submissionDetails, correlationId } = msg

    // Get details from cache regarding desirability score
    // const desirabilityScore = await cache.getDesirabilityScore(correlationId)

    console.log('MADE IT TO DETAILS', submissionDetails, 'WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW')
    const msgOut = createMsg(submissionDetails, desirabilityScore)

    await sendDesirabilitySubmitted(msgOut, correlationId)

  } catch (err) {
    console.error(`[ERROR][UNABLE TO PROCESS CONTACT DETAILS RECEIVER MESSAGE][${err}]`)
    appInsights.logException(err, msg?.correlationId)
  }
}
