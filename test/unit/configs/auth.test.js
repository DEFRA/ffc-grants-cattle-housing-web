const { crumbToken } = require('./test-helper')

describe('login page', () => {
    const varList = { farmerDetails: 'someValue', contractorsDetails: 'someValue' }

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
            url: `${global.__URLPREFIX__}/login`,
            headers: {
                cookie: 'crumb=' + crumbToken
            }
        }

        const response = await global.__SERVER__.inject(options)
        expect(response.statusCode).toBe(200)
        expect(response.payload).toContain('login')
    })
    
})
