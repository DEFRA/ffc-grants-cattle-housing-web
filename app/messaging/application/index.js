const { sendMessage, receiveMessage } = require('../')
const { scoreRequestQueue, fetchCostRequestMsgType, costResponseQueue } = require('../../config/messaging.js')
// temporarily changed to fetchCostrequestMsgType from fetchScoreRequestMsgType
// temporarily changed to costResponseQueue from scoreResponseQueue
async function getStandardisedCosts (sessionId) {
  console.log('[MADE IT TO MESSAGE]', sessionId)
  await sendMessage({ }, fetchCostRequestMsgType, scoreRequestQueue, { sessionId })

  console.log('[FINISHED SENDING MESSAGE MOVING TO RECEIVING]')
  return receiveMessage(sessionId, costResponseQueue)
}

module.exports = {
  getStandardisedCosts
}
