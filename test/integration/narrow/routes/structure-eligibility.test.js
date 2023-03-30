const { crumbToken } = require('./test-helper')
const fakeDescription = 'fake description fake description fake description'
describe('Page: /structure-eligibility', () => {
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
    url: `${global.__URLPREFIX__}/structure-eligibility`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('Does your building structure meet the eligibility criteria?')
    expect(response.payload).toContain('Yes')
    expect(response.payload).toContain('No')
})

it('should returns error message if description is more than 25', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/structure-eligibility`,
        payload: { structureEligibility: 'Yes', yesStructureEligibility: fakeDescription, crumb: crumbToken },
        headers: {
        cookie: 'crumb=' + crumbToken
        }
    }
    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Description must be 25 characters or less')
})

it('should returns error message if description have unexpected characters', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/structure-eligibility`,
        payload: { structureEligibility: 'Yes', yesStructureEligibility: 'sdsd@', crumb: crumbToken },
        headers: {
        cookie: 'crumb=' + crumbToken
        }
    }
    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Description must only include letters, numbers, full stops, commas, hyphens and apostrophes')
})

it('should returns error message if description does not have any value', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/structure-eligibility`,
        payload: { structureEligibility: 'Yes', crumb: crumbToken },
        headers: {
        cookie: 'crumb=' + crumbToken
        }
    }
    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Describe the building structure')
})

it('no option selected -> show error message', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/structure-eligibility`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { crumb: crumbToken }
    }
    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select yes if your building structure meets the eligibility criteria')
})

it('user selects eligible option -> store user response and redirect to /drainage-slope', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/structure-eligibility`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { structureEligibility: 'Yes', yesStructureEligibility:'Fake description', crumb: crumbToken }
    }
    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('drainage-slope')
})
it('should display ineligible page when user response is \'No\' ', async () => {
    const postOptions = {
        method: 'POST',
        url: `${global.__URLPREFIX__}/structure-eligibility`,
        payload: { structureEligibility: 'No', crumb: crumbToken },
        headers: {
        cookie: 'crumb=' + crumbToken
        }
    }
    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.payload).toContain('You cannot apply for a grant from this scheme')
    })
it('page loads with correct back link', async () => {
    const options = {
    method: 'GET',
    url: `${global.__URLPREFIX__}/structure-eligibility`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"structure\" class=\"govuk-back-link\">Back</a>')
})
})
