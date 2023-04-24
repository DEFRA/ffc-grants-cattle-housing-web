const { crumbToken } = require('./test-helper')

const varListTemplate = {
    legalStatus: 'randomData',
    projectType: 'fakeData',
    calfWeight:'100kg or under',
    floorSpace: null,
    'current-score': null
}
let varList

const mockSession = {
  setYarValue: (request, key, value) => null,
  getYarValue: (request, key) => {
    if (Object.keys(varList).includes(key)) return varList[key]
    else return 'Error'
  }
}

jest.mock('../../../../app/helpers/session', () => mockSession)

describe('Page: /floor-space-under100kg', () => {
    beforeEach(() => {
        varList = { ...varListTemplate }
    })
    afterEach(() => {
        jest.clearAllMocks()
    })
it('page loads successfully, with all the options', async () => {
    varList.floorSpace = undefined

    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/floor-space-under100kg`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('How much space will each calf have?')
  })

  it('no option selected -> show error message', async () => {
    varList['current-score'] = null
    const postOptions = {
      method: 'POST',
      url: `${global.__URLPREFIX__}/floor-space-under100kg`,
      headers: { cookie: 'crumb=' + crumbToken },
      payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Enter how much space each calf will have')
  })

it('user selects eligible option: \'floorSpace: 22\' -> display environmental-impact', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/floor-space-under100kg`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { floorSpace: '22', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('environmental-impact')
  })
  it('should return an error message if a string is typed in', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/floor-space-under100kg`,
        payload: { floorSpace: '1234s', crumb: crumbToken },
        headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Floor space must be 2 decimal places or less')
  })

  it('should return an error message if number contains a space', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/floor-space-under100kg`,
    payload: { floorSpace: '124 6', crumb: crumbToken },
    headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Floor space must be 2 decimal places or less')
  })
  it('should return an error message if number contains a comma "," ', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/floor-space-under100kg`,
        payload: { floorSpace: '123,46', crumb: crumbToken },
        headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Floor space must be 2 decimal places or less')
  })

  it('should return an error message if 3dp entered', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/floor-space-under100kg`,
    payload: { floorSpace: '12.456', crumb: crumbToken },
    headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Floor space must be 2 decimal places or less')
  })

  it('should return an error message if the number of digits typed exceed 5', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/floor-space-under100kg`,
        payload: { floorSpace: '123456', crumb: crumbToken },
        headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Number must be between 3-99.99')
  })

  it('should return an error message if 0 entered', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/floor-space-under100kg`,
        payload: { floorSpace: '0', crumb: crumbToken },
        headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Number must be between 3-99.99')
  })

  it('should return an error message if more than 99.99 entered', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/floor-space-under100kg`,
        payload: { floorSpace: '100', crumb: crumbToken },
        headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Number must be between 3-99.99')
  })

  it('should return an error message if less than base value entered', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/floor-space-under100kg`,
        payload: { floorSpace: '1', crumb: crumbToken },
        headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Floor space must be a minimum of 3m2')
  })

  it('should store valid user input and redirect to environmental-impact page', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/floor-space-under100kg`,
        payload: { floorSpace: '23', crumb: crumbToken },
        headers: { cookie: 'crumb=' + crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('environmental-impact')
  })

  it('page loads with correct back link', async () => {
    const options = {
      method: 'GET',
      url: `${global.__URLPREFIX__}/floor-space-under100kg`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"permanent-sick-pen\" class=\"govuk-back-link\">Back</a>')
  })
})
