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
    
})
