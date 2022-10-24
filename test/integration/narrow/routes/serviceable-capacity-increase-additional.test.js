const { crumbToken } = require('./test-helper')

describe('Page: /serviceable-capacity-increase-additional', () => {
  const varList = { inEngland: 'randomData' }

  jest.mock('../../../../app/helpers/session', () => ({
    setYarValue: (request, key, value) => null,
    getYarValue: (request, key) => {
      if (varList[key]) return varList[key]
      else return 'Error'
    }
  }))

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/serviceable-capacity-increase-additional`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What estimated additional volume do you need to have 6 months’ serviceable storage?')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/serviceable-capacity-increase-additional`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"storage-type\" class=\"govuk-back-link\">Back</a>')
  })
})
