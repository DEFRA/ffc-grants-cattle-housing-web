const { crumbToken } = require('./test-helper')

describe('Page: /automatic-calf-feeder', () => {
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
			url: `${global.__URLPREFIX__}/automatic-calf-feeder`,
		}

		const response = await global.__SERVER__.inject(options)
		expect(response.statusCode).toBe(200)
		expect(response.payload).toContain('How many calves will you have per automatic feeder?')
		expect(response.payload).toContain('1 to 4');
		expect(response.payload).toContain('5 to 8');
		expect(response.payload).toContain('9 to 12');
		expect(response.payload).toContain('13 or more');
		expect(response.payload).toContain('We do not use an automatic feeder');
	});

	it('no option selected -> show error message', async () => {
		const postOptions = {
			method: 'POST',
			url: `${global.__URLPREFIX__}/automatic-calf-feeder`,
			headers: { cookie: 'crumb=' + crumbToken },
			payload: { crumb: crumbToken }
		}

		const postResponse = await global.__SERVER__.inject(postOptions)
		expect(postResponse.statusCode).toBe(200)
		expect(postResponse.payload).toContain('Select how many calves you will have per automatic calf feeder')
	});

	it('user selects eligible option: \'Yes\' -> Advances to /moisture-control', async () => {
		const postOptions = {
			method: 'POST',
			url: `${global.__URLPREFIX__}/automatic-calf-feeder`,
			headers: { cookie: 'crumb=' + crumbToken },
			payload: { automaticCalfFeeder: 'Yes', crumb: crumbToken }
		}

		const postResponse = await global.__SERVER__.inject(postOptions)
		expect(postResponse.statusCode).toBe(302)
		expect(postResponse.headers.location).toBe(`moisture-control`)
	});
});
