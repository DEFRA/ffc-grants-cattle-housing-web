const { sendMessage, receiveMessage } = require('../')
const { scoreRequestQueue, fetchScoreRequestMsgType, scoreResponseQueue } = require('../../config/messaging.js')
const createMsg = require('./../scoring/create-desirability-msg')

async function getUserScore (desirabilityMsg, sessionId) {
  console.log('[MADE IT TO MESSAGE]', sessionId)
  // Add formatMsg via process-desirability
  // where does body come from in process-desirability?

  const msgForScoring = createMsg(desirabilityMsg)

  await sendMessage(msgForScoring, fetchScoreRequestMsgType, scoreRequestQueue, { sessionId })

  console.log('[FINISHED SENDING MESSAGE MOVING TO RECEIVING]')
  return receiveMessage(sessionId, scoreResponseQueue)
}

module.exports = {
  getUserScore
}
