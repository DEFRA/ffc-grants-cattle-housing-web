const grantSchemeConfig = require('./config/grant-scheme')
const { desirabilityInputQuestionMapping, desirabilityQuestions: questionContent } = require('./content-mapping')
const desirabilityQuestions = ['housing', 'calf-group-size', 'number-of-calves', 'automatic-calf-feeder', 'moisture-control', 'permanent-sick-pen', 'floor-space', 'environmental-impact', 'sustainable-materials', 'introducing-innovation']
function getUserAnswer(answers, userInput, floorSpaceVar) {
    if (answers) {
        return [userInput].flat().map(answer =>
            ({ key: Object.keys(answers).find(key => answers[key] === answer), value: answer }))
    } else {

        return [{ key: floorSpaceVar, value: userInput }]
    }
}

function getDesirabilityDetails(questionKey, userInput, floorSpaceVar) {
    const content = questionContent[questionKey]

    return {
        key: questionKey,
        answers: content.map(({ key, title, answers }) => ({
            key,
            title,
            input: getUserAnswer(answers, userInput[desirabilityInputQuestionMapping[key]], floorSpaceVar)
        })),
        rating: {
            score: null,
            band: null,
            importance: null
        }
    }
}

function desirability(userInput, floorSpaceVar) {
    return {
        grantScheme: {
            key: grantSchemeConfig[0].key,
            name: grantSchemeConfig[0].name
        },
        desirability: {
            questions: desirabilityQuestions.map(questionKey => getDesirabilityDetails(questionKey, userInput, floorSpaceVar)),
            overallRating: {
                score: null,
                band: null
            }
        }
    }
}

module.exports = desirability
