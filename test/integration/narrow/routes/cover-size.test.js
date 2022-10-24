const { crumbToken } = require('./test-helper')

describe('Page: /cover-size', () => {
  const varList = { inEngland: 'randomData' }

  jest.mock('../../../../app/helpers/session', () => ({
    setYarValue: (request, key, value) => null,
    getYarValue: (request, key) => {
      if (varList[key]) return varList[key]
      else return 'Error'
    }
  }))

  it('page loads successfully, with heading ', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/cover-size`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('How big will the cover be?')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/cover-size`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"cover-type\" class=\"govuk-back-link\">Back</a>')
  })
})
