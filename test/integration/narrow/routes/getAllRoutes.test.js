const { ALL_QUESTIONS } = require('../../../../app/config/question-bank')
let varList
ALL_QUESTIONS.forEach(question => {
  if (question.preValidationKeys) {
    varList = question.preValidationKeys.map(m => {
      return { m: 'someValue', 'current-score': '' }
    })
  }
})

jest.mock('../../../../app/helpers/session', () => ({
  setYarValue: (request, key, value) => null,
  getYarValue: (request, key) => {
    if (varList[key]) return varList[key]
    else return 'Error'
  }
}))

describe('All default GET routes', () => {
  ALL_QUESTIONS.forEach(question => {
    console.log(varList,'LLLLLLLLLLLLIIIIII')

    it(`should load ${question.key} page successfully`, async () => {
      const options = {
        method: 'GET',
        url: `${global.__URLPREFIX__}/${question.url}`
      }
      const response = await global.__SERVER__.inject(options)
      expect(response.statusCode).toBe(200)
    })
  })
})
