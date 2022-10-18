describe('Create submission messages', () => {
  const createSubmissionMsg = require('../../../../../app/messaging/email/create-submission-msg')
  const testTimeConstant = new Date(2022, 8, 18)
  const todayStr = testTimeConstant.toLocaleDateString('en-GB')
  const sixMonthsLater = new Date(testTimeConstant)
  sixMonthsLater.setMonth(testTimeConstant.getMonth() + 6)

  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(testTimeConstant)
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('As a farmer', async () => {
    process.env.NODE_ENV = ''
    const { farmerSubmission } = require('./test-helpers/farmer-submission')
    const { expectedOutcomeFarmer } = require('./test-helpers/expected-outcome-farmer')

    const farmerApplicationResult = createSubmissionMsg(farmerSubmission)

    expect(farmerApplicationResult).toEqual(expectedOutcomeFarmer(testTimeConstant, sixMonthsLater, todayStr))
  })

  test('As a farmer with micro turnover', async () => {
    const { farmerSubmissionMicroTurnover } = require('./test-helpers/farmer-submission')
    const { expectedOutcomeFarmerMicro } = require('./test-helpers/expected-outcome-farmer')

    const submission = createSubmissionMsg(farmerSubmissionMicroTurnover)

    const outcome = expectedOutcomeFarmerMicro(testTimeConstant, sixMonthsLater, todayStr)

    expect(submission).toEqual(outcome)
  })

  test('As a farmer with small turnover', async () => {
    const { farmerSubmissionSmallTurnover } = require('./test-helpers/farmer-submission')
    const { expectedOutcomeFarmerSmall } = require('./test-helpers/expected-outcome-farmer')

    const result = createSubmissionMsg(farmerSubmissionSmallTurnover)

    expect(result).toEqual(expectedOutcomeFarmerSmall(testTimeConstant, sixMonthsLater, todayStr))
  })

  test('As a farmer with medium turnover', async () => {
    const { farmerSubmissionMediumTurnover } = require('./test-helpers/farmer-submission')
    const { expectedOutcomeFarmerMedium } = require('./test-helpers/expected-outcome-farmer')

    const agentSubmissionForFarmerApplicationResult = createSubmissionMsg(farmerSubmissionMediumTurnover)

    expect(agentSubmissionForFarmerApplicationResult).toEqual(expectedOutcomeFarmerMedium(testTimeConstant, sixMonthsLater, todayStr))
  })

  test('As an agent on a farmers behalf', async () => {
    const agentSubmissionForFarmer = require('./test-helpers/agent-submission-for-farmer')
    const expectedOutcomeAgent = require('./test-helpers/expected-outcome-agent')

    const agentSubmissionForFarmerApplicationResult = createSubmissionMsg(agentSubmissionForFarmer)

    expect(agentSubmissionForFarmerApplicationResult).toEqual(expectedOutcomeAgent(testTimeConstant, sixMonthsLater, todayStr))
  })
})
