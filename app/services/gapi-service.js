const appInsights = require('./app-insights')
const { getYarValue, setYarValue } = require('../helpers/session')
// const protectiveMonitoringServiceSendEvent = require('../services/protective-monitoring-service')
const blockDefaultPageViews = ['start', 'applying']
// const blockDefaultPageViews = [
//   'start', 'applying', 'confirmation', 'products-processed', 'remaining-costs',
//   'project-cost', 'project-start', 'planning-permission', 'score',
//   'country', 'legal-status', 'farming-type'
// ]
const isBlockDefaultPageView = (url) => {
  const currentUrl = url.pathname.split('/').pop().toString().toLowerCase()
  return blockDefaultPageViews.indexOf(currentUrl) >= 0
}


const grant_type = 'Slurry Infrastructure'
// or is it...?
// const grant_type = 'Animal Health and Wellfare'

const eventTypes = {
  PAGEVIEW: 'pageview',
  SCORE: 'score',
  ELIGIBILITY: 'eligibility_passed',
  CONFIRMATION: 'confirmation',
  ELIMINATION: 'elimination',
  EXCEPTION: 'exception'
}

const sendGAEvent = async (request, metrics) => {
  const timeSinceStart = getTimeofJourneySinceStart(request).toString()
  const page_path = request.route.path
  const { name, params } = metrics
  const isEliminationEvent = name === eventTypes.ELIMINATION
  const isEligibilityEvent = name === eventTypes.ELIGIBILITY
  const isScoreEvent = name === eventTypes.SCORE
  const isConfirmationEvent = name === eventTypes.CONFIRMATION

  const url = JSON.stringify(request.headers);

  const dmetrics = {
    ...params,
    ...(isEliminationEvent && { elimination_time: timeSinceStart }),
    ...(isEligibilityEvent && { eligibility_time: timeSinceStart }),
    ...(isScoreEvent && { score_time: timeSinceStart }),
    ...(isConfirmationEvent && { final_score: getYarValue(request, 'current-score'), user_type: getYarValue(request, 'applying'), confirmation_time: timeSinceStart }),
    ...(params?.score_presented && { score_presented: params.score_presented }),
    grant_type,
    page_path,
    test: 'v.1.0.1'
  }
  try {
    const event = { name, params: dmetrics }
    await request.ga.view(request, [event])
    console.log('Metrics Sending analytics %s for %s', name, request.route.path)
  } catch (err) {
    appInsights.logException(request, { error: err })
  }
  console.log('[ %s MATRIC SENT ]', name.toUpperCase())
}

const getTimeofJourneySinceStart = (request) => {
  if (getYarValue(request, 'journey-start-time')) {
    return Math.abs(((new Date()).getTime() - (new Date(getYarValue(request, 'journey-start-time'))).getTime()) / 1000)
  }
  return 0
}

module.exports = {
  isBlockDefaultPageView,
  sendGAEvent,
  eventTypes
}
