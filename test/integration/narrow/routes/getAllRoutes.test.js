const { ALL_QUESTIONS } = require('../../../../app/config/question-bank')
const scoreData = require('../../../data/score-data')

let varList
ALL_QUESTIONS.forEach(question => {
  if (question.preValidationKeys) {
    varList = question.preValidationKeys.map(m => {
      return { m: 'someValue' }
    })
  }
})
jest.doMock('../../../../app/helpers/session', () => ({
  setYarValue: (request, key, value) => null,
  getYarValue: (request, key) => {
    if (varList[key]) return varList[key]
    else return 'Error'
  }
}))

const newSender = require('../../../../app/messaging/application')
const createMsg = require('../../../../app/messaging/create-msg')
const getDesirabilityAnswersSpy = jest.spyOn(createMsg, 'getDesirabilityAnswers').mockImplementation(() => {
  return {
    test: 'test'
  };
})
const getUserScoringSpy = jest.spyOn(newSender, 'getUserScore').mockImplementation(() => {
  Promise.resolve(scoreData);
})


describe('All default GET routes', () => {
  beforeEach(async () => {
		jest.mock('../../../../app/messaging')
		jest.mock('../../../../app/messaging/senders')
		jest.mock('ffc-messaging')
	})
	afterEach(async () => {
		jest.clearAllMocks()
	})

  ALL_QUESTIONS.forEach(question => {
    it(`should load ${question.key} page successfully`, async () => {
      // for score page only
      jest.spyOn(newSender, 'getUserScore').mockImplementationOnce(() => {
        console.log('Spy: weakkk', JSON.stringify(scoreData));
        return scoreData
      })

      const options = {
        method: 'GET',
        url: `${global.__URLPREFIX__}/${question.url}`
      }
      const response = await global.__SERVER__.inject(options)
      expect(response.statusCode).toBe(200)
    })
  })
})
