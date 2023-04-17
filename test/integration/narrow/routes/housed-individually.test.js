const { crumbToken } = require('./test-helper')

describe('Page: /housed-individually', () => {
  const varList = {
    legalStatus: 'randomData',
    projectType: 'fakeData',
    tenancy: 'Yes',
    tenancyLength: null,
    calfWeight: '100kg or under'
  }

  jest.mock('../../../../app/helpers/session', () => ({
    setYarValue: (request, key, value) => null,
    getYarValue: (request, key) => {
      if (varList[key]) return varList[key]
      else return undefined
    }
  }))

  it('page loads successfully, with all the options', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/housed-individually`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Will calves over 7 days old be housed individually?')
    expect(response.payload).toContain('Only in exceptional circumstance')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/housed-individually`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select the option that applies to you')
  })

  it('user selects ineligible option: \'Yes\' -> display ineligible page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/housed-individually`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { housedIndividually: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
  })

  it('user selects eligible option -> store user response and redirect to /isolate-calves', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/housed-individually`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { housedIndividually: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('isolate-calves')
  })

  it('page loads with correct back link when calf-weight  page`s answer is 100kg or under', async () => {
    varList.calfWeight = '100kg or under'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/housed-individually`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"living-space-3m2\" class=\"govuk-back-link\">Back</a>')
  })

  it('page loads with correct back link when calf-weight  page`s answer is Between 100kg and 150kg', async () => {
    varList.calfWeight = 'Between 100kg and 150kg'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/housed-individually`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"living-space-4m2\" class=\"govuk-back-link\">Back</a>')
  })
  it('page loads with correct back link when calf-weight  page`s answer is Over 150kg', async () => {
    varList.calfWeight = 'Over 150kg'
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/housed-individually`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"living-space-5m2\" class=\"govuk-back-link\">Back</a>')
  })
})
