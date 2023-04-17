const { crumbToken } = require('./test-helper')

describe('Page: /calf-weight', () => {
  const varList = {
    legalStatus: 'randomData',
    projectType: 'fakeData',
    'current-score': ''
  }

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
      url: `${global.__URLPREFIX__}/calf-weight`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What will be the weight of the largest calf?')
    expect(response.payload).toContain('100kg or under')
    expect(response.payload).toContain('Between 100kg and 150kg')
    expect(response.payload).toContain('Over 150kg')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/calf-weight`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select the option that applies to you')
  })

  it('user selects eligible option: \'100kg or under\' -> display living-space-3m2 page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/calf-weight`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { calfWeight: '100kg or under', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('living-space-3m2')
  })

  it('user selects eligible option: \'Between 100kg and 150kg\' -> display living-space-4m2 page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/calf-weight`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { calfWeight: 'Between 100kg and 150kg', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('living-space-4m2')
  })

  it('user selects eligible option: \'Over 150kg\' -> display living-space-5m2 page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/calf-weight`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { calfWeight: 'Over 150kg', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('living-space-5m2')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/calf-weight`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"project\" class=\"govuk-back-link\">Back</a>')
  })
})
