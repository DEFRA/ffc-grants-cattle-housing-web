const { crumbToken } = require('./test-helper')

describe('Page: /structure', () => {
const varList = {
    legalStatus: 'randomData',
    projectType: 'fakeData'
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
    url: `${global.__URLPREFIX__}/structure`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What type of structure is your building?')
    expect(response.payload).toContain('Mono-pitch building')
    expect(response.payload).toContain('A permanent open-sided structure with igloos/hutches')
})

it('no option selected -> show error message', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/structure`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select the option that applies to you')
})

it('user selects redirect option: \'Other\' -> display structure-eligibility page', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/structure`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { structure: 'Other', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('structure-eligibility')
})

it('user selects eligible option -> store user response and redirect to /drainage-slope', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/structure`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { structure: 'Mono-pitch building', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('drainage-slope')
})
it('user selects conditional option -> store user response and redirect to /structure-eligibility', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/structure`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { structure: 'Other', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('structure-eligibility')
})

it('page loads with correct back link', async () => {
    const options = {
    method: 'GET',
    url: `${global.__URLPREFIX__}/structure`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"isolate-calves\" class=\"govuk-back-link\">Back</a>')
})
})
