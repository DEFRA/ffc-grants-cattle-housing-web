xdescribe('Process submission', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const msg = {
    body: {
      submissionDetails: 'lorem ipsum'
    },
    correlationId: 7357
  }

  test('Successful path', async () => {
    const processSubmission = require('../../../../../app/messaging/email/process-submission')

    const contactDetailsReceiver = jest.mock()
    contactDetailsReceiver.completeMessage = jest.fn()

    const createMessageMock = require('../../../../../app/messaging/email/create-submission-msg')

    jest.mock('../../../../../app/messaging/email/create-submission-msg')
    createMessageMock.mockReturnValue(true)

    const { sendDesirabilitySubmitted } = require('../../../../../app/messaging/senders')
    jest.mock('../../../../../app/messaging/senders')

    sendDesirabilitySubmitted.mockResolvedValue(true)

    // expect used to be related to index.js

    
  })

  test('Error path', async () => {
    const processSubmission = require('../../../../../app/messaging/email/process-submission')
    processSubmission.completeMessage = jest.fn()

    const contactDetailsReceiver = jest.mock()
    contactDetailsReceiver.abandonMessage = jest.fn()

    const appInsightsMock = require('../../../../../app/services/app-insights')
    jest.mock('../../../../../app/services/app-insights')
    appInsightsMock.logException = jest.fn()

    processSubmission(msg, contactDetailsReceiver)
        // expect used to be related to index.js


  })
})
