const grantSchemeConfig = require('./config/grant-scheme')
const { desirabilityInputQuestionMapping, desirabilityQuestions: questionContent } = require('./content-mapping')
const desirabilityQuestions = ['inEngland']
function getUserAnswer(answers, userInput) {
    if (answers) {
        return [userInput].flat().map(answer =>
            ({ key: Object.keys(answers).find(key => answers[key] === answer), value: answer }))
    } else {
        return [{ key: null, value: userInput }]
    }
}

function getDesirabilityDetails(questionKey, userInput) {
    const content = questionContent[questionKey]

    return {
        key: questionKey,
        answers: content.map(({ key, title, answers }) => ({
            key,
            title,
            input: getUserAnswer(answers, userInput[desirabilityInputQuestionMapping[key]])
        })),
        rating: {
            score: null,
            band: null,
            importance: null
        }
    }
}

function desirability(userInput) {
    return {
        grantScheme: {
            key: grantSchemeConfig[0].key,
            name: grantSchemeConfig[0].name
        },
        desirability: {
            questions: desirabilityQuestions.map(questionKey => getDesirabilityDetails(questionKey, userInput)),
            overallRating: {
                score: null,
                band: null
            }
        }
    }
}

module.exports = desirability
