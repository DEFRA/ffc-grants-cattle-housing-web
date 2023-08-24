const urlPrefix = require('../config/server').urlPrefix
const { getYarValue } = require('../helpers/session')
const { ALL_QUESTIONS } = require('../config/question-bank')

const getUrl = (urlObject, url, request, secBtn, currentUrl) => {
  const scorePath = `${urlPrefix}/score`
  const chekDetailsPath = `${urlPrefix}/check-details`
  const secBtnPath = secBtn === 'Back to score' ? scorePath : chekDetailsPath

  if (!urlObject) {
    return secBtn ? secBtnPath : url
  }

  const { dependentQuestionYarKey, dependentAnswerKeysArray, urlOptions, nonDependentAnswerKeysArray = [] } = urlObject
  const { thenUrl, elseUrl, nonDependentUrl } = urlOptions

  const dependentAnswer = getYarValue(request, dependentQuestionYarKey)

  // handle unique input key (can be generalised later)
  if (dependentQuestionYarKey === 'SolarPVCost') {
    // if key is not null, show then page, otherwise show else
    return  dependentAnswer != null ? thenUrl : elseUrl
  }

  const selectThenUrl = checkAnswerExist(dependentQuestionYarKey, dependentAnswer, dependentAnswerKeysArray)
  const isNonDependantAnswer = checkAnswerExist(dependentQuestionYarKey, dependentAnswer, nonDependentAnswerKeysArray)
  const selectedElseUrl = (dependentAnswer && !isNonDependantAnswer) ? elseUrl : nonDependentUrl

  const nextUrl = selectThenUrl ? thenUrl : selectedElseUrl

  return secBtn ? secBtnPath : nextUrl
}
const checkAnswerExist = (dependentQuestionYarKey, dependentAnswer, yarKeysToCheck) => {
  return ALL_QUESTIONS.find(thisQuestion => (
    thisQuestion.yarKey === dependentQuestionYarKey &&
    thisQuestion.answers &&
    thisQuestion.answers.some(answer => (
      !!dependentAnswer &&
      yarKeysToCheck.includes(answer.key) &&
      dependentAnswer.includes(answer.value)
    ))
    
  ))
}
module.exports = {
  getUrl
}
