describe('create-msg', () => {
  jest.mock('../../../../app/helpers/session')
  const { getYarValue } = require('../../../../app/helpers/session')

  const { getDesirabilityAnswers } = require('../../../../app/messaging/create-msg')

  test('check getDesirabilityAnswers()', () => {
    let dict
    getYarValue.mockImplementation((req, key) => (dict[key]))

    dict = {
      inEngland: 'hello'
    }
    expect(getDesirabilityAnswers({})).toEqual({
      inEngland: 'hello'
    })

    dict = {
      ...dict,
      environmentalImpact: ['env-imp']
    }
    expect(getDesirabilityAnswers({})).toEqual({
      inEngland: 'hello'
    })

    dict = {
      ...dict,
      howAddingValue: ['how-av']
    }
    expect(getDesirabilityAnswers({})).toEqual(null)
  })
})
