const appInsights = require('./app-insights')
const { getYarValue } = require('../helpers/session')
const blockDefaultPageViews = ['start', 'applying', 'login']

const isBlockDefaultPageView = (url) => {
  const currentUrl = url.pathname.split('/').pop().toString().toLowerCase()
  return blockDefaultPageViews.indexOf(currentUrl) >= 0
}

const grant_type = 'Upgrading Calf Housing'

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
  const pagePath = request.route.path
  const host_name = request.info.hostname
  const { name, params } = metrics
  const isEliminationEvent = name === eventTypes.ELIMINATION
  const isEligibilityEvent = name === eventTypes.ELIGIBILITY
  const isScoreEvent = name === eventTypes.SCORE
  const isConfirmationEvent = name === eventTypes.CONFIRMATION
  const dmetrics = {
    ...params,
    ...(isEliminationEvent && { elimination_time: timeSinceStart }),
    ...(isEligibilityEvent && { eligibility_time: timeSinceStart }),
    ...(isScoreEvent && { score_time: timeSinceStart }),
    ...(isConfirmationEvent && { final_score: getYarValue(request, 'current-score'), user_type: getYarValue(request, 'applying'), confirmation_time: timeSinceStart }),
    ...(params?.score_presented && { score_presented: params.score_presented }),
    ...(params?.scoreReached && { scoreReached: params.scoreReached }),
    grant_type,
    page_title: pagePath,
    host_name
  }
  try {
    console.log(name, 'dmetrics:::::: ', dmetrics)
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
