const { crumbToken } = require('./test-helper')

describe('Page: /roof-solar-PV', () => {
  const varList = {
    legalStatus: 'randomData',
    projectType: 'fakeData'
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
      url: `${global.__URLPREFIX__}/roof-solar-PV`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Will the roof of the grant-funded calf housing be able to support solar PV panels?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
    expect(response.payload).toContain('My roof is exempt')
  })

  it('no option selected -> show error message', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/roof-solar-PV`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if the roof is able to support solar PV panels')
  })

  it('user selects eligible option: \'Yes\' -> display solar-PV-system', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/roof-solar-PV`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { roofSolarPV: 'Yes', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('solar-PV-system')
  })

  it('user selects ineligible option: \'No\' -> display roof-solar-PV ineligible page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/roof-solar-PV`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { roofSolarPV: 'No', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
  })

  it('user selects ineligible option: \'My roof is exempt\' -> display roof-solar-PV ineligible page', async () => {
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/roof-solar-PV`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { roofSolarPV: 'My roof is exempt', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('upgrading-existing-building')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/roof-solar-PV`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"additional-items\" class=\"govuk-back-link\">Back</a>')
  })
})
