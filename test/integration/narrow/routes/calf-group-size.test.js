const { crumbToken } = require('./test-helper')

describe('Page: /group-size', () => {
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
			url: `${global.__URLPREFIX__}/group-size`,
		}

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		expect(response.payload).toContain('What will be the average calf group size for calves over 7 days old?')
		expect(response.payload).toContain('2 to 3');
		expect(response.payload).toContain('4 to 8');
		expect(response.payload).toContain('9 to 12');
		expect(response.payload).toContain('13 or more');
	});

	it('no option selected -> show error message', async () => {
		const postOptions = {
			method: 'POST',
			url: `${global.__URLPREFIX__}/group-size`,
			headers: { cookie: 'crumb=' + crumbToken },
			payload: { crumb: crumbToken }
		}

		const postResponse = await global.__SERVER__.inject(postOptions)
		expect(postResponse.statusCode).toBe(200)
		expect(postResponse.payload).toContain('Select what size the average calf group will be for calves over 7 days old')
	});

	it('user selects eligible option: \'2 to 3\' -> Advances to /disease-transmission', async () => {
		const postOptions = {
			method: 'POST',
			url: `${global.__URLPREFIX__}/group-size`,
			headers: { cookie: 'crumb=' + crumbToken },
			payload: { calfGroupSize: '2 to 3', crumb: crumbToken }
		}

		const postResponse = await global.__SERVER__.inject(postOptions)
		expect(postResponse.statusCode).toBe(302)
		expect(postResponse.headers.location).toBe('number-of-calves')
	});

});