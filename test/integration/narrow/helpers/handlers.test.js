const data = require('../../../../app/helpers/desirability-score.json')

describe('Get & Post Handlers', () => {
  const varList = {
    planningPermission: 'some fake value',
    gridReference: 'grid-ref-num',
    businessDetails: 'fake business',
    applying: true
  }

  jest.mock('../../../../app/helpers/page-guard', () => ({
    guardPage: (a, b, c) => false
  }))

  jest.mock('../../../../app/helpers/urls', () => ({
    getUrl: (a, b, c, d) => 'mock-url'
  }))

  jest.mock('../../../../app/helpers/session', () => ({
    setYarValue: (request, key, value) => null,
    getYarValue: (request, key) => {
      if (varList[key]) return varList[key]
      else return null
    }
  }))

  let question
  let mockH

  const { getHandler, createModel } = require('../../../../app/helpers/handlers')

  test('will redirect to start page if planning permission evidence is missing', async () => {
    question = {
      url: 'planning-permission-summary',
      title: 'mock-title'
    }
    mockH = { redirect: jest.fn() }

    await getHandler(question)({}, mockH)
    expect(mockH.redirect).toHaveBeenCalledWith('/upgrading-calf-housing/start')
  })

  test('is eligible if calculated grant = min grant - whether grant is capped or not', async () => { // TODO: I don't understand this test is trying to check for
    question = {
      url: 'mock-url',
      title: 'mock-title',
      maybeEligible: true,
      maybeEligibleContent: { reference: 'mock-reference' }
    }
    mockH = { redirect: jest.fn() }

    await getHandler(question)({}, mockH)
    expect(mockH.redirect).toHaveBeenCalledWith('/upgrading-calf-housing/start')
  })

  describe('it handles the score results page: ', () => {
    test('Average score', async () => {
      question = {
        url: 'score',
        title: 'mock-title',
        backUrl: 'test-back-link'
      }
      mockH = { view: jest.fn() }
  
      await getHandler(question)({}, mockH)
      expect(mockH.view).toHaveBeenCalledWith('score', {
        titleText: data.desirability.overallRating.band,
        backLink: "test-back-link",
        formActionPage: "score",
        scoreChance: "might",
        scoreData: data,
        questions: data.desirability.questions,
      })
    });

    test('Strong score', async () => {
      data.desirability.overallRating.band = 'Strong'
      question = {
        url: 'score',
        title: 'mock-title',
        backUrl: 'test-back-link'
      }
      mockH = { view: jest.fn() }
  
      await getHandler(question)({}, mockH)
      expect(mockH.view).toHaveBeenCalledWith('score', {
        titleText: data.desirability.overallRating.band,
        backLink: "test-back-link",
        formActionPage: "score",
        scoreChance: "is likely to",
        scoreData: data,
        questions: data.desirability.questions,
      })
    });

    test('Default score', async () => {
      data.desirability.overallRating.band = 'AAAARRRGGHH!!!'
      question = {
        url: 'score',
        title: 'mock-title',
        backUrl: 'test-back-link'
      }
      mockH = { view: jest.fn() }
  
      await getHandler(question)({}, mockH)
      expect(mockH.view).toHaveBeenCalledWith('score', {
        titleText: data.desirability.overallRating.band,
        backLink: "test-back-link",
        formActionPage: "score",
        scoreChance: "is unlikely to",
        scoreData: data,
        questions: data.desirability.questions,
      })
    });
  })



  describe('Create Model', () => {
    test('it creates a model!', () => {
      const res = createModel(data, 'test-back-link', 'score')
      expect(res).toEqual({
        ...data,
        formActionPage: "score",
        backLink: "test-back-link",
      })
    })
  });
})
