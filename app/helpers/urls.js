const urlPrefix = require('../config/server').urlPrefix
const { getYarValue } = require('../helpers/session')
const { ALL_QUESTIONS } = require('../config/question-bank')

const getUrl = (urlObject, url, request, secBtn, currentUrl) => {
  const scorePath = `${urlPrefix}/score`
  const chekDetailsPath = `${urlPrefix}/check-details`

  let secBtnPath
  if (secBtn === 'Back to score') {
    secBtnPath = scorePath
  } else {
    switch (currentUrl) {
      case 'planning-permission':
      case 'planning-permission-evidence':
      case 'grid-reference': {
        secBtnPath = `${urlPrefix}/planning-permission-summary`
        break
      }
      default:
        secBtnPath = chekDetailsPath
    }
  }

  if (!urlObject) {
    return secBtn ? secBtnPath : url
  }

  
      const { dependentQuestionYarKey, dependentAnswerKeysArray, urlOptions, nonDependentAnswerKeysArray = [] } = urlObject
      const { thenUrl, elseUrl, nonDependentUrl } = urlOptions
    
      const dependentAnswer = getYarValue(request, dependentQuestionYarKey)
    
      const selectThenUrl = checkAnswerExist (dependentQuestionYarKey, dependentAnswer, dependentAnswerKeysArray)
      const isNonDependantAnswer = checkAnswerExist(dependentQuestionYarKey, dependentAnswer, nonDependentAnswerKeysArray)
      console.log('selectThenUrl', selectThenUrl)
      const selectedElseUrl = (dependentAnswer && !isNonDependantAnswer)  ? elseUrl : nonDependentUrl
    
      return selectThenUrl ? thenUrl : selectedElseUrl
    
}
const checkAnswerExist = (dependentQuestionYarKey, dependentAnswer, yarKeysToCheck ) => {
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
