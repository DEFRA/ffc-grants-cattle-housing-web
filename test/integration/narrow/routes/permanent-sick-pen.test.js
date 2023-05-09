const { crumbToken } = require('./test-helper')

describe('Page: /permanent-sick-pen', () => {
    const varList = {
        legalStatus: 'randomData',
        projectType: 'fakeData',
        minimumFloorArea: '100kg or under'
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
    url: `${global.__URLPREFIX__}/permanent-sick-pen`
    }

    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('What type of sick pen will your building have?')
    expect(response.payload).toContain('A permanent sick pen')
    expect(response.payload).toContain('A separate air space')
    expect(response.payload).toContain('A permanent heat source (for example heat lamps)')
    expect(response.payload).toContain('None of the above')
})
it('no option selected -> show error message', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/permanent-sick-pen`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { permanentSickPen: '', crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('Select if your building will have a permanent sick pen with separate air space')
})
it(' \'None of the above\' selected with another option -> show error message', async () => {
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/permanent-sick-pen`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { permanentSickPen: ['None of the above', 'A separate air space'], crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(200)
    expect(postResponse.payload).toContain('You cannot select that combination of options')
})
// it('user selects eligible option -> store user response and redirect to /floor-space-under100kg', async () => {
//     const postOptions = {
//     method: 'POST',
//     url: `${global.__URLPREFIX__}/permanent-sick-pen`,
//     headers: { cookie: 'crumb=' + crumbToken },
//     payload: { permanentSickPen: ['A separate air space'], crumb: crumbToken }
//     }

//     const postResponse = await global.__SERVER__.inject(postOptions)
//     expect(postResponse.statusCode).toBe(302)
//     expect(postResponse.headers.location).toBe('floor-space-under100kg')
// })
it('user selects eligible option -> store user response and redirect to /floor-space-100kg-150kg', async () => {
    varList.minimumFloorArea = 'Between 100kg and 150kg'
    const postOptions = {
    method: 'POST',
    url: `${global.__URLPREFIX__}/permanent-sick-pen`,
    headers: { cookie: 'crumb=' + crumbToken },
    payload: { permanentSickPen: ['A separate air space'], crumb: crumbToken }
    }

    const postResponse = await global.__SERVER__.inject(postOptions)
    expect(postResponse.statusCode).toBe(302)
    expect(postResponse.headers.location).toBe('floor-space-100kg-150kg')
})
// it('user selects eligible option  -> store user response and redirect to /floor-space-over150kg', async () => {
//     varList.minimumFloorArea = 'Over 150kg'
//     const postOptions = {
//     method: 'POST',
//     url: `${global.__URLPREFIX__}/permanent-sick-pen`,
//     headers: { cookie: 'crumb=' + crumbToken },
//     payload: { permanentSickPen: ['A separate air space'], crumb: crumbToken }
//     }

//     const postResponse = await global.__SERVER__.inject(postOptions)
//     expect(postResponse.statusCode).toBe(302)
//     expect(postResponse.headers.location).toBe('floor-space-over150kg')
// })

it('page loads with correct back link', async () => {
    const options = {
    method: 'GET',
    url: `${global.__URLPREFIX__}/permanent-sick-pen`
    }
    const response = await global.__SERVER__.inject(options)
    expect(response.statusCode).toBe(200)
    expect(response.payload).toContain('<a href=\"moisture-control\" class=\"govuk-back-link\">Back</a>')
})
})
