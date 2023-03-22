const { crumbToken } = require('./test-helper')

describe('Page: /number-of-calves', () => {
	const varList = {
		legalStatus: 'randomData',
		projectType: 'fakeData',
		tenancy: 'Yes',
		tenancyLength: null,
		calfWeight: '100kg or under',
		housedIndividually: 'Yes',
		isolateCalves: 'Yes',
		remainingCosts: 'Yes',
		housing: 'Yes',
		calfGroupSize: '2 to 3',
	}

	jest.mock('../../../../app/helpers/session', () => ({
		setYarValue: (request, key, value) => null,
		getYarValue: (request, key) => {
			if (varList[ key ]) return varList[ key ]
			else return 'Error'
		}
	}));

	it('page loads successfully, with all the options', async () => {
		const options = {
			method: 'GET',
			url: `${global.__URLPREFIX__}/number-of-calves`,
		}

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		expect(response.payload).toContain('What will be the maximum number of calves in the calf housing?')
		expect(response.payload).toContain('2 to 50');
		expect(response.payload).toContain('51 to 100');
		expect(response.payload).toContain('Over 100');
	});

	it('no option selected -> show error message', async () => {
		const postOptions = {
			method: 'POST',
			url: `${global.__URLPREFIX__}/number-of-calves`,
			headers: { cookie: 'crumb=' + crumbToken },
			payload: { crumb: crumbToken }
		}

		const postResponse = await global.__SERVER__.inject(postOptions)
		expect(postResponse.statusCode).toBe(200)
		expect(postResponse.payload).toContain('Select what will be the maximum number of calves housed in the calf housing')
	});

	it('user selects eligible option: \'2 to 3\' -> Advances to /automatic-calf-feeder', async () => {
		const postOptions = {
			method: 'POST',
			url: `${global.__URLPREFIX__}/number-of-calves`,
			headers: { cookie: 'crumb=' + crumbToken },
			payload: { numberOfCalves: '2 to 3', crumb: crumbToken }
		}

		const postResponse = await global.__SERVER__.inject(postOptions)
		expect(postResponse.statusCode).toBe(302)
		expect(postResponse.headers.location).toBe('automatic-calf-feeder')
	});
});
