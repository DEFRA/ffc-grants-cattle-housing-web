const { crumbToken } = require('./test-helper')

describe('Page: /living-space-3m2', () => {
  const varList = {
    legalStatus: 'randomData',
      projectType: 'fakeData',
      'current-score': null

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
      url: `${global.__URLPREFIX__}/living-space-3m2`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Will each calf have at least 3m² living space?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/living-space-3m2`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if each calf will have at least 3m² living space')
  })

  it('user selects eligible option: \'Yes\' -> display housed-individually', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/living-space-3m2`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { livingSpace3m2: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('housed-individually')
  })

  it('user selects ineligible option: \'No\' -> display living-space-3m2 page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/living-space-3m2`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { livingSpace3m2: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/living-space-3m2`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"calf-weight\" class=\"govuk-back-link\">Back</a>')
  })
})
