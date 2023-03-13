const {
  CURRENCY_FORMAT,
  CHARS_MAX_10,
  CHARS_MIN_10,
  CHARS_MAX_100,
  POSTCODE_REGEX,
  WHOLE_NUMBER_REGEX,
  SBI_REGEX,
  NAME_ONLY_REGEX,
  PHONE_REGEX,
  EMAIL_REGEX,
  ONLY_TEXT_REGEX,
  ONLY_DIGITS_REGEX,
  PLANNING_REFERENCE_NUMBER_REGEX,
  LETTERS_AND_NUMBERS_REGEX,
  TWO_NUMBERS_EIGHT_CHARS,
  CHARS_MAX_50,
  COMMA_EXCLUDE_REGEX,
  ADDRESS_REGEX
} = require('../helpers/regex')

const { LIST_COUNTIES } = require('../helpers/all-counties')

/**
 * ----------------------------------------------------------------
 * list of yarKeys not bound to an answer, calculated separately
 * -  calculatedGrant
 * -  remainingCost
 *
 * Mainly to replace the value of a previously stored input
 * Format: {{_VALUE_}}
 * eg: question.title: 'Can you pay £{{_storedYarKey_}}'
 * ----------------------------------------------------------------
 */

/**
 * ----------------------------------------------------------------
 * question type = single-answer, boolean ,input, multiinput, mullti-answer
 *
 *
 * ----------------------------------------------------------------
 */

/**
 * multi-input validation schema
 *
 *  type: 'multi-input',
    allFields: [
      {
        ...
        validate: [
          {
            type: 'NOT_EMPTY',
            error: 'Error message'
          },
          {
            type: 'REGEX',
            error: 'Error message',
            regex: SAVED_REGEX
          },
          {
            type: 'MIN_MAX',
            error: 'Error message',
            min: MINIMUM,
            max: MAXIMUM
          }
        ]
      }
    ]
 */

const questionBank = {
  grantScheme: {
    key: 'FFC002',
    name: 'Slurry Infrastructure'
  },
  sections: [
    {
      name: 'eligibility',
      title: 'Eligibility',
      questions: [
        {
          key: 'applicant-type',
          order: 10,
          title: 'What type of farmer are you?',
          hint: {
            text: 'Select all that apply'
          },
          pageTitle: '',
          ga: [ { journeyStart: true } ],
          url: 'applicant-type',
          baseUrl: 'applicant-type',
          backUrl: 'start',
          nextUrl: 'legal-status',
          ineligibleContent: {
            messageContent: `
            This grant is for:</br>
            <ul class="govuk-list govuk-list--bullet">
              <li>building new calf housing</li>
              <li>refurbishing or extending existing calf housing</li>
            </ul>
            `,
            insertText: {text: 'A calf is up to 6 months of age.'},
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `This grant is for:`,
                items: [
                  `building new calf housing`,
                  `refurbishing or extending existing calf housing`,
                ],
                additionalPara: `A calf is up to 6 months of age.`
              } ]
            } ]
          },
          fundingPriorities: 'Improve the environment',
          type: 'multi-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to you'
            },
            {
              type: 'STANDALONE_ANSWER',
              error: 'You cannot select that combination of options',
              standaloneObject: {
                questionKey: 'applicant-type',
                answerKey: 'applicant-type-A4'
              }
            }
          ],
          answers: [
            {
              key: 'applicant-type-A1',
              value: 'Dairy farmer'
            },
            {
              key: 'applicant-type-A2',
              value: 'Beef farmer'
            },
            {
              key: 'applicant-type-A3',
              value: 'Mixed farmer (cattle and arable)'
            },
            {
              value: 'divider'
            },
            {
              key: 'applicant-type-A4',
              value: 'None of the above',
              notEligible: true
            }
          ],
          yarKey: 'applicantType'
        },
        {
          key: 'legal-status',
          order: 20,
          title: 'What is the legal status of the business?',
          pageTitle: '',
          backUrl: 'applicant-type',
          nextUrl: 'country',
          url: 'legal-status',
          baseUrl: 'legal-status',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'Your business does not have an eligible legal status.',
            details: {
              summaryText: 'Who is eligible',
              html: '<ul class="govuk-list govuk-list--bullet"><li>Sole trader</li><li>Partnership</li><li>Limited company</li><li>Charity</li><li>Trust</li><li>Limited liability partnership</li><li>Community interest company</li><li>Limited partnership</li><li>Industrial and provident society</li><li>Co-operative society (Co-Op)</li><li>Community benefit society (BenCom)</li></ul>'
            },
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for.'
            },
            warning: {
              text: 'Other types of business may be supported in future schemes',
              iconFallbackText: 'Warning'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: 'Public organisations and local authorities cannot apply for this grant.',
                items: []
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the legal status of the business'
            }
          ],
          answers: [
            {
              key: 'legal-status-A1',
              value: 'Sole trader'
            },
            {
              key: 'legal-status-A2',
              value: 'Partnership'
            },
            {
              key: 'legal-status-A3',
              value: 'Limited company'
            },
            {
              key: 'legal-status-A4',
              value: 'Charity'
            },
            {
              key: 'legal-status-A5',
              value: 'Trust'
            },
            {
              key: 'legal-status-A6',
              value: 'Limited liability partnership'
            },
            {
              key: 'legal-status-A7',
              value: 'Community interest company'
            },
            {
              key: 'legal-status-A8',
              value: 'Limited partnership'
            },
            {
              key: 'legal-status-A9',
              value: 'Industrial and provident society'
            },
            {
              key: 'legal-status-A10',
              value: 'Co-operative society (Co-Op)'
            },
            {
              key: 'legal-status-A11',
              value: 'Community benefit society (BenCom)'
            },
            {
              value: 'divider'
            },
            {
              key: 'legal-status-A12',
              value: 'None of the above',
              notEligible: true
            }
          ],
          yarKey: 'legalStatus'
        },
        {
          key: 'country',
          order: 141,
          title: 'Is the planned project in England?',
          hint: {
            text: 'The location of the calf housing'
          },
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          pageTitle: '',
          backUrl: 'legal-status',
          nextUrl: 'planning-permission',
          url: 'country',
          baseUrl: 'country',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'This grant is only for projects in England.',
            insertText: { text: 'Scotland, Wales and Northern Ireland have other grants available.' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `This grant is only for projects in England.
                
                Scotland, Wales and Northern Ireland have other grants available.`
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the project is in England'
            }
          ],
          answers: [
            {
              key: 'country-A1',
              value: 'Yes'
            },
            {
              key: 'country-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'inEngland'
        },
        {
          key: 'planning-permission',
          order: 142,
          title: 'Does the project have planning permission?',
          pageTitle: '',
          url: 'planning-permission',
          baseUrl: 'planning-permission',
          backUrl: 'country',
          nextUrl: 'project-started',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'Any planning permission must be in place by 31 January 2024 (the end of the application window).',
            messageLink: {
              url: 'https://www.gov.uk/topic/farming-food-grants-payments/rural-grants-payments',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: 'Improving Adding Value',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `You must have secured planning permission before you submit a full application.

                        Any planning permission must be in place by 31 January 2024.`
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select when the project will have project planning permission'
            }
          ],
          answers: [
            {
              key: 'planning-permission-A1',
              value: 'Not needed'
            },
            {
              key: 'planning-permission-A2',
              value: 'Secured'
            },
            {
              key: 'planning-permission-A3',
              value: 'Should be in place by 31 January 2024',
              redirectUrl: 'planning-permission-condition'
            },
            {
              key: 'planning-permission-A4',
              value: 'Will not have by 31 January 2024',
              notEligible: true
            }
          ],
          yarKey: 'planningPermission'
        },
        {
          key: 'planning-permission-condition',
          order: 145,
          url: 'planning-permission-condition',
          backUrl: 'planning-permission',
          nextUrl: 'project-started',
          maybeEligible: true,
          preValidationKeys: [],
          maybeEligibleContent: {
            messageHeader: 'You may be able to apply for a grant from this scheme',
            messageContent: 'Any planning permission must be in place by 31 January 2024 (the end of the application window).'
          },
          yarKey: 'PlanningPermissionCondition'
        },
        {
          key: 'project-started',
          order: 151,
          title: 'Have you already started work on the project?',
          pageTitle: '',
          url: 'project-started',
          baseUrl: 'project-started',
          backUrl: 'planning-permission',
          nextUrl: 'tenancy',
          backUrlObject: {
            dependentQuestionYarKey: 'planningPermission',
            dependentAnswerKeysArray: [ 'planning-permission-A1', 'planning-permission-A2' ],
            urlOptions: {
              thenUrl: 'planning-permission',
              elseUrl: 'planning-permission-condition'
            }
          },
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'You cannot apply for a grant if you have already started work on the project.',
            insertText: { text: 'Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement invalidates your application.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `
                You will invalidate your application if you start the project or commit to any costs (such as placing orders) before you receive a funding agreement.
                
                Before you start the project, you can:`,
                items: [
                  'get quotes from suppliers',
                  'apply for planning permission (this can take a long time)'
                ]
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to your project'
            }
          ],
          answers: [
            {
              key: 'project-started-A1',
              value: 'Yes, preparatory work',
              hint: {
                text: 'For example, quotes from suppliers, applying for planning permission'
              }
            },
            {
              key: 'project-started-A2',
              value: 'Yes, we have begun project work',
              hint: {
                text: 'For example, started construction work, signing contracts, placing orders'
              },
              notEligible: true
            },
            {
              key: 'project-started-A3',
              value: 'No, we have not done any work on this project yet'
            }
          ],
          yarKey: 'projectStart'
        },
        {
          key: 'tenancy',
          order: 152,
          title: 'Is the planned project on land the business owns?',
          hint: {
            text: 'The location of the calf housing'
          },
          pageTitle: '',
          url: 'tenancy',
          baseUrl: 'tenancy',
          backUrl: 'project-started',
          nextUrl: 'project',
          preValidationKeys: [],
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: 'You must own the land or have a tenancy in place for 5 years after the final grant payment.'
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the planned project is on land the business owns'
            }
          ],
          answers: [
            {
              key: 'tenancy-A1',
              value: 'Yes'
            },
            {
              key: 'tenancy-A2',
              value: 'No',
              redirectUrl: 'tenancy-length'
            }
          ],
          yarKey: 'tenancy'
        },
        {
          key: 'tenancy-length',
          order: 60,
          title: 'Do you have a tenancy agreement for 5 years after the final grant payment?',
          hint: {
            text: 'The location of the calf housing'
          },
          pageTitle: '',
          url: 'tenancy-length',
          baseUrl: 'tenancy-length',
          backUrl: 'tenancy',
          preValidationKeys: [],
          nextUrl: 'project',
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: 'You must own the land or have a tenancy in place for 5 years after the final grant payment.',
                items: []
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the land has a tenancy agreement in place for 5 years after the final grant payment.'
            }
          ],
          answers: [
            {
              key: 'tenancy-length-A1',
              value: 'Yes'
            },
            {
              key: 'tenancy-length-A2',
              value: 'No',
              redirectUrl: 'tenancy-length-condition'
            }
          ],
          yarKey: 'tenancyLength'
        },
        {
          key: 'tenancy-length-condition',
          title: 'You may be able to apply for a grant from this scheme',
          order: 70,
          url: 'tenancy-length-condition',
          backUrl: 'tenancy-length',
          preValidationKeys: [],
          nextUrl: 'project',
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'You may be able to apply for a grant from this scheme',
            messageContent: 'You will need to extend your tenancy agreement for 5 years after the final grant payment.'
          }
        },
        {
          key: 'project',
          order: 80,
          title: 'What is your project?',
          baseUrl: 'project',
          backUrl: 'tenancy',
          nextUrl: 'calf-weight',
          url: 'project',
          backUrlObject: {
            dependentQuestionYarKey: 'tenancyLength',
            dependentAnswerKeysArray: [ 'tenancy-length-A1' ],
            urlOptions: {
              thenUrl: 'tenancy-length',
              elseUrl: 'tenancy-length-condition',
              nonDependentUrl: 'tenancy'
            }
          },
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: `
                <div class="govuk-list govuk-list--bullet">
                <p class="govuk-body">This grant is for:</p>
                      <ul>
                        <li>building new calf housing</li>
                        <li>refurbishing or extending existing calf housing</li>
                      </ul>
                </div>`,
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you might be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `This grant is for:`,
                items: [ 'building new calf housing', 'refurbishing or extending existing calf housing' ]
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to you'
            }
          ],
          answers: [
            {
              key: 'project-A1',
              value: 'Building new calf housing '
            },
            {
              key: 'project-A2',
              value: 'Refurbishing or extending existing calf housing'
            },
            {
              value: 'divider'
            },
            {
              key: 'project-A3',
              value: 'Something else',
              notEligible: true
            }
          ],
          yarKey: 'project'
        },
        {
          key: 'calf-weight',
          order: 90,
          title: 'What will be the weight of the largest calf?',
          baseUrl: 'calf-weight',
          backUrl: 'project',
          url: 'calf-weight',
          hint: {
            text: 'A calf is up to 6 months of age'
          },
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: `<p class="govuk-body">This grant is for:</p>
              <div class="govuk-list govuk-list--bullet">
                    You can use:
                    <ul>
                      <li>building new calf housing</li>
                      <li>refurbishing or extending existing calf housing</li>
                    </ul>
              </div>`,
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you might be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `There must be a minimum floor area of:`,
                items: [ '3m² per calf when largest calf is 100kg or under', '4m² per calf when largest calf is between 100kg and 150kg', '5m² per calf when largest calf is over 150kg' ]
              } ]
            }, ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to you'
            }
          ],
          answers: [
            {
              key: 'calf-weight-A1',
              value: '100kg or under',
              redirectUrl: 'living-space-3m2'
            },
            {
              key: 'calf-weight-A2',
              value: 'Between 100kg and 150kg',
              redirectUrl: 'living-space-4m2',
            },
            {
              key: 'calf-weight-A3',
              value: 'Over 150kg',
              redirectUrl: 'living-space-5m2'
            }
          ],
          yarKey: 'calfWeight'
        },
        {
          key: 'living-space-3m2',
          order: 100,
          title: 'Will each calf have at least 3m² living space?',
          baseUrl: 'living-space-3m2',
          backUrl: 'calf-weight',
          nextUrl: 'housed-individually',
          url: 'living-space-3m2',
          preValidationKeys: [],
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          ineligibleContent: {
            messageContent: `Calves weighing up to 100kg must have at least 3m² living space`,
            insertText: { text: 'This includes the lying, standing and feeding/drinking areas.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you might be eligible for.'
            },
            additionalPara: `The required space-per-calf for each group or pair may change over time so the housing design should account for this.`
          },
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `
                Calves weighing up to 100kg must have at least 3m² living space.

                This includes the lying, standing and feeding/drinking areas.

                The required space-per-calf for each group or pair may change over time so the housing design should account for this.  `,
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if each calf will have at least 3m² living space'
            }
          ],
          answers: [
            {
              key: 'living-space-3m2-A1',
              value: 'Yes',
            },
            {
              key: 'living-space-3m2-A2',
              value: 'No',
              notEligible: true,
            }
          ],
          yarKey: 'livingSpace3m2'
        },
        {
          key: 'living-space-4m2',
          order: 104,
          title: 'Will each calf have at least 4m² living space?',
          baseUrl: 'living-space-4m2',
          backUrl: 'calf-weight',
          nextUrl: 'housed-individually',
          url: 'living-space-4m2',
          preValidationKeys: [],
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          ineligibleContent: {
            messageContent: `Calves weighing between 100kg and 150kg must have at least 4m² living space.`,
            insertText: { text: 'This includes the lying, standing and feeding/drinking areas.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you might be eligible for.'
            },
            additionalPara: `The required space-per-calf for each group or pair may change over time so the housing design should account for this.`
          },
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `
                      Calves weighing between 100kg and 150kg must have at least 4m² living space.

                      This includes the lying, standing and feeding/drinking areas.

                      The required space-per-calf for each group or pair may change over time so the housing design should account for this.`,
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if each calf will have at least 4m² living space'
            }
          ],
          answers: [
            {
              key: 'living-space-4m2-A1',
              value: 'Yes',
            },
            {
              key: 'living-space-4m2-A2',
              value: 'No',
              notEligible: true,
            }
          ],
          yarKey: 'livingSpace4m2'
        },
        {
          key: 'living-space-5m2',
          order: 107,
          title: 'Will each calf have at least 5m² living space?',
          baseUrl: 'living-space-5m2',
          backUrl: 'calf-weight',
          nextUrl: 'housed-individually',
          url: 'living-space-5m2',
          preValidationKeys: [],
          type: 'single-answer',
          minAnswerCount: 1,
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          ineligibleContent: {
            messageContent: `Calves weighing over 150kg must have at least 5m² living space.`,
            insertText: { text: 'This includes the lying, standing and feeding/drinking areas.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you might be eligible for.'
            },
            additionalPara: `The required space-per-calf for each group or pair may change over time so the housing design should account for this.`
          },
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `Calves weighing over 150kg must have at least 5m² living space.

                      This includes the lying, standing and feeding/drinking areas.
                
                      The required space-per-calf for each group or pair may change over time so the housing design should account for this.  `,
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if each calf will have at least 5m² living space'
            }
          ],
          answers: [
            {
              key: 'living-space-5m2-A1',
              value: 'Yes',
            },
            {
              key: 'living-space-5m2-A2',
              value: 'No',
              notEligible: true,
            }
          ],
          yarKey: 'livingSpace5m2'
        },
        {
          key: 'housed-individually',
          order: 110,
          title: 'Will calves over 7 days old be housed individually?',
          baseUrl: 'housed-individually',
          url: 'housed-individually',
          nextUrl: 'isolate-calves',
          preValidationKeys: [],
          backUrlObject: {
            dependentQuestionYarKey: 'calfWeight',
            dependentAnswerKeysArray: [ 'calf-weight-A1' ],
            nonDependentAnswerKeysArray: [ 'calf-weight-A3' ],
            urlOptions: {
              thenUrl: 'living-space-3m2',
              elseUrl: 'living-space-4m2',
              nonDependentUrl: 'living-space-5m2'
            }
          },
          ineligibleContent: {
            messageContent: `<p class="govuk-body">Calves can only be housed individually in exceptional circumstances (for example, illness or no other calves of similar age).</p>`,
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you might be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `Calves can only be housed individually in exceptional circumstances (for example, illness or no other calves of similar age).`,
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to you'
            }
          ],
          answers: [
            {
              key: 'housed-individually-A1',
              value: 'Yes',
              notEligible: true
            },
            {
              key: 'housed-individually-A2',
              value: 'No'
            },
            {
              key: 'housed-individually-A3',
              value: 'Only in exceptional circumstance',
              hint: {
                html: 'For example illness, no other calves of similar age'
              },
            }
          ],
          yarKey: 'housedIndividually'
        },
        {
          key: 'isolate-calves',
          order: 120,
          title: 'Will there be facilities to temporarily isolate sick calves?',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          baseUrl: 'isolate-calves',
          url: 'isolate-calves',
          backUrl: 'housed-individually',
          nextUrl: 'straw-bedding',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'The building must have facilities to temporarily isolate sick calves (for example, a temporary pen erected in an existing pen to isolate a sick calf).',
            insertText: { text: 'Sick calves may need to be temporarily isolated to prevent spreading disease.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you might be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `The calf housing must have solid concrete flooring.`,
                additionalPara: `It cannot have slatted or hardcore flooring.`,
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if there will be facilities to temporarily isolate sick calves'
            }
          ],
          answers: [
            {
              key: 'isolate-calves-A1',
              value: 'Yes',
            },
            {
              key: 'isolate-calves-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'isolateCalves'
        },
        {
          key: 'straw-bedding',
          order: 125,
          title: 'Will the calf housing have straw bedding?',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          baseUrl: 'straw-bedding',
          url: 'straw-bedding',
          backUrl: 'isolate-calves',
          nextUrl: 'concrete-flooring',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'The calf housing must have straw bedding (using cereal straw).',
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `The calf housing must have straw bedding (using cereal straw).`
              } ],
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the calf housing will have straw bedding'
            }
          ],
          answers: [
            {
              key: 'straw-bedding-A1',
              value: 'Yes',
            },
            {
              key: 'straw-bedding-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'strawBedding'
        },
        {
          key: 'concrete-flooring',
          order: 130,
          title: 'Will the calf housing have solid concrete flooring?',
          baseUrl: 'concrete-flooring',
          url: 'concrete-flooring',
          backUrl: 'straw-bedding',
          nextUrl: 'enrichment',
          preValidationKeys: [ 'strawBedding' ],
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          ineligibleContent: {
            messageContent: 'The calf housing must have solid concrete flooring.',
            insertText: { text: 'It cannot have slatted or hardcore flooring.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `The calf housing must have solid concrete flooring.`,
                additionalPara: `It cannot have slatted or hardcore flooring.`,
              } ],
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the calf housing will have solid concrete flooring'
            }
          ],
          answers: [
            {
              key: 'concrete-flooring-A1',
              value: 'Yes',
            },
            {
              key: 'concrete-flooring-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'concreteFlooring'
        },
        {
          key: 'enrichment',
          order: 140,
          title: 'Will there be at least one enrichment item per pair or group of calves?',
          hint: {
            text: 'Not including straw bedding and social contact'
          },
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          baseUrl: 'enrichment',
          url: 'enrichment',
          backUrl: 'concrete-flooring',
          nextUrl: 'structure',
          preValidationKeys: [ 'concreteFlooring' ],
          ineligibleContent: {
            messageContent: 'Each pair or group of calves must have at least one enrichment item (for example brushes or hanging balls).',
            insertText: {
              text: 'This does not include straw bedding and social contact.'
            },
            additionalPara: `The grant will fund off-the-shelf items for cattle. Other enrichment items (for example cardboard boxes) are not funded.`,
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `Each pair or group of calves must have at least one enrichment item (for example brushes or hanging balls).`,
                additionalPara: `The grant will fund off-the-shelf items for cattle. Other enrichment items (for example cardboard boxes) are not funded.`,
              } ],
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if there will be at least one enrichment item per pair or group of calves'
            }
          ],
          answers: [
            {
              key: 'enrichment-A1',
              value: 'Yes',
            },
            {
              key: 'enrichment-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'enrichment'
        },
        {
          key: 'structure',
          order: 130,
          title: 'What type of structure is your building?',
          pageTitle: '',
          url: 'structure',
          baseUrl: 'structure',
          backUrl: 'enrichment',
          nextUrl: 'drainage-slope',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: `<p class="govuk-body">Each pair or group of calves must have at least one enrichment item, such as:</p>
                              <div class="govuk-list govuk-list--bullet">
                                    <ul>
                                      <li>brushes</li>
                                      <li>hanging balls</li>
                                    </ul>
                              </div>`,
            insertText: { text: 'This does not include straw bedding and social contact.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [
              {
                heading: 'Eligibility',
                content: [ {
                  para: `All buildings must be permanent structures.`,
                } ]
              }
            ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select the option that applies to you'
            }
          ],
          answers: [
            {
              key: 'structure-A1',
              value: 'A-frame building'
            },
            {
              key: 'structure-A2',
              value: 'Mono-pitch building'
            },
            {
              key: 'structure-A3',
              value: 'A permanent open-sided structure with igloos/hutches',
            },
            {
              key: 'structure-A4',
              value: 'Other',
              redirectUrl: 'structure-eligibility'
            }
          ],
          yarKey: 'structure'
        },
        {
          key: 'structure-eligibility',
          order: 135,
          title: 'Does your building structure meet the eligibility criteria?',
          hint: {
            html: `<div class:"govuk-hint">
            All buildings must:</br></br>
            <li>be permanent structures</li>
            <li>have adequate drainage</li>
            <li>protect calves from draughts with solid walls/barriers to calf height</li>
            </div>`
          },
          pageTitle: '',
          backUrl: 'structure',
          nextUrl: 'drainage-slope',
          url: 'structure-eligibility',
          baseUrl: 'structure-eligibility',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'This grant is only for projects in England.',
            insertText: { text: 'Scotland, Wales and Northern Ireland have other grants available.' },
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if your building structure meets the eligibility criteria'
            }
          ],
          answers: [
            {
              key: 'structure-eligibility-A1',
              value: 'Yes'
            },
            {
              key: 'structure-eligibility-A2',
              value: 'No',
              notEligible: true
            },
          ],
          yarKey: 'structureEligibility'
        },
        {
          key: 'drainage-slope',
          order: 140,
          title: 'Will the floor in bedded areas slope towards a drain or drainage channel?',
          hint: {
            text: 'The floor must have at least 5% gradient'
          },
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          pageTitle: '',
          backUrlObject: {
            dependentQuestionYarKey: 'structure',
            dependentAnswerKeysArray: [ 'structure-A1', 'structure-A2', 'structure-A3' ],
            urlOptions: {
              thenUrl: 'structure',
              elseUrl: 'structure-eligibility'
            }
          },
          nextUrl: 'draught-protection',
          url: 'drainage-slope',
          baseUrl: 'drainage-slope',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'The building must have sloped flooring with a 1 in 20 (5%) gradient in bedded areas that slopes towards a drain or drainage channel. ',
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `The building must have sloped flooring with a 1 in 20 (5%) gradient in bedded areas that slopes towards a drain or drainage channel.`
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the floor in bedded areas slope towards a drain or drainage channel'
            }
          ],
          answers: [
            {
              key: 'drainage-slope-A1',
              value: 'Yes'
            },
            {
              key: 'drainage-slope-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'drainageSlope'
        },
        {
          key: 'draught-protection',
          order: 150,
          title: 'Will calves be protected from draughts?',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          pageTitle: '',
          backUrl: 'drainage-slope',
          nextUrl: 'additional-items',
          url: 'draught-protection',
          baseUrl: 'draught-protection',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'All projects must have external calf-height solid walls/barriers to keep out draughts. ',
            insertText: { text: 'For igloos/hutches adjacent to a permanent open-sided structure, this may mean adding solid sides to the outside pens.' },
            messageLink: {
              url: '',
              title: ''
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `All projects must have permanent external calf-height solid walls/barriers to keep out drafts.

                      For a permanent open-sided structure with igloos/hutches, this may mean adding permanent solid sides to the outside pens (hay bales are not sufficient).`
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the calves will be protected from draughts'
            }
          ],
          answers: [
            {
              key: 'drainage-slope-A1',
              value: 'Yes'
            },
            {
              key: 'drainage-slope-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'drainageSlope'
        },
        {
          key: 'additional-items',
          order: 160,
          title: 'Will the building have these items?',
          hint: {
            html: `<div class:"govuk-hint">
            The building must have:</br></br>
            <li>access to a water supplyr</li>
            <li>at least 2 IP66 sockets in the building</li>
            <li>temperature and humidity data loggers (capable of autonomously recording temperature/humidity over a defined period and storing data to view later)</li>
            </div>`
          },
          pageTitle: '',
          backUrl: 'draught-protection',
          nextUrl: 'lighting',
          url: 'additional-items',
          baseUrl: 'additional-items',
          preValidationKeys: [],
          sidebar: {
            values: [
              {
                heading: 'Eligibility',
                content: [ {
                  para: `The building must have:`,
                  items: [
                    'access to a water supply',
                    'at least 2 IP66 sockets in the building',
                    'temperature and humidity data loggers (capable of autonomously recording temperature/humidity over a defined period and storing data to view later)'
                  ]
                } ]
              }
            ]
          },
          ineligibleContent: {
            messageContent: `<p class="govuk-body">The building must have:</p>
            <div class="govuk-list govuk-list--bullet">
                  <ul>
                    <li>access to a water supplyr</li>
                    <li>at least 2 IP66 sockets in the building</li>
                    <li>temperature and humidity data loggers (capable of autonomously recording temperature/humidity over a defined period and storing data to view later)</li>
                  </ul>
            </div>`,
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the building will have these items'
            }
          ],
          answers: [
            {
              key: 'additional-items-A1',
              value: 'Yes'
            },
            {
              key: 'additional-items-A2',
              value: 'No',
              notEligible: true
            },
          ],
          yarKey: 'additionalItems'
        },
        {
          key: 'lighting',
          order: 170,
          title: 'Will the building have fitted lighting of at least 50 lux?',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          pageTitle: '',
          backUrl: 'additional-items',
          nextUrl: 'estimated-grant',
          url: 'lighting',
          baseUrl: 'lighting',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: 'The building must have fitted lighting of at least 50 lux.',
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          minAnswerCount: 1,
          sidebar: {
            values: [ {
              heading: 'Eligibility',
              content: [ {
                para: `The building must have fitted lighting of at least 50 lux.`
              } ]
            } ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if the building will have fitted lighting of at least 50 lux'
            }
          ],
          answers: [
            {
              key: 'lighting-A1',
              value: 'Yes'
            },
            {
              key: 'lighting-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'lighting'
        },
        {
          key: 'estimated-grant',
          order: 180,
          url: 'estimated-grant',
          backUrl: 'lighting',
          nextUrl: 'standardised-grant-amounts',
          preValidationKeys: [],
          ga: [
            { dimension: 'cm2', value: { type: 'journey-time' } }
          ],
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Estimate how much grant you could get',
            messageContent: 'Add some information about the project (for example, type of store and capacity, type of cover and size, approximate size and quantity of other items you need) so we can estimate how much grant you could get.'
          }
        },
        // Calls standardised cost page
        // CALLS PROJECT SUMMARY
        {
          key: 'potential-amount',
          order: 150,
          url: 'potential-amount',
          baseUrl: 'potential-amount',
          backUrl: 'project-summary',
          nextUrl: 'remaining-costs',
          preValidationKeys: [],
          grantInfo: {
            minGrant: 25000,
            maxGrant: 250000,
            grantPercentage: '',
            cappedGrant: true
          },
          ineligibleContent: {
            messageContent: 'The minimum grant you can claim is £25,000.',
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Potential grant funding',
            messageContent: 'Based on the standardised grant amount for each item and the approximate size and quantities you entered, we estimate you could be eligible for a grant of £{{_calculatedGrant_}}',
            warning: {
              text: 'There’s no guarantee the project will receive a grant.'
            }
          }
        },
        {
          key: 'remaining-costs',
          order: 190,
          title: 'Can you pay the remaining costs?',
          pageTitle: '',
          url: 'remaining-costs',
          baseUrl: 'remaining-costs',
          backUrl: 'standardised-grant-amounts',
          nextUrl: 'result-page',
          preValidationKeys: [],
          ineligibleContent: {
            messageContent: `<p class="govuk-body">You cannot use public money (for example, grant funding from government or local authorities) towards the project costs.</p>
            <div class="govuk-list govuk-list--bullet">
                  You can use:
                  <ul>
                    <li>loans</li>
                    <li>overdrafts</li>
                    <li>the Basic Payment Scheme</li>
                  </ul>
            </div>`,
            messageLink: {
              url: 'https://www.gov.uk/government/collections/rural-payments-and-grants',
              title: 'See other grants you may be eligible for.'
            }
          },
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          sidebar: {
            values: [
              {
                heading: 'Eligibility',
                content: [ {
                  para: `You cannot use public money (for example, grant funding from government or local authorities) towards the project costs.
                  
                  You can use:`,
                  items: [
                    'loans',
                    'overdrafts',
                    'the Basic Payment Scheme'
                  ]
                } ]
              }
            ]
          },
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select if you can pay the remaining costs'
            }
          ],
          answers: [
            {
              key: 'remaining-costs-A1',
              value: 'Yes'

            },
            {
              key: 'remaining-costs-A2',
              value: 'No',
              notEligible: true
            }
          ],
          yarKey: 'remainingCosts'
        },
        {
          key: 'housing',
          order: 151,
          url: 'housing',
          baseUrl: 'housing',
          backUrl: 'remaining-costs',
          nextUrl: 'disease-transmission',
          preValidationKeys: ['remainingCosts'],
          pageTitle: '',
          title: 'Are you moving from individually housing calves over 7 days old to pair or group housing?',
          fundingPriorities: 'RPA wants to fund projects that move from individually housing calves to pair or group housing.',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select yes if you are moving from individually housed calves over 7 days old to pair or group housing'
            }
          ],
          answers: [
            {
              key: 'housing-A1',
              value: 'Yes'
            },
            {
              key: 'housing-A2',
              value: 'No',
            }
          ],
          sidebar: {
            values: [
              {
                heading: 'Funding Priorities',
                content: [ {
                  para: `RPA wants to fund projects that move from individually housing calves to pair or group housing.`
                } ]
              }
            ]
          },
          yarKey: 'housing'
        },
        {
          key: 'result-page',
          order: 156,
          title: 'Your results',
          url: 'result-page',
          baseUrl: 'result-page',
          backUrl: 'remaining-costs',
          nextUrl: 'business-details',
          preValidationKeys: [],
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Your results',
            messageContent: `Based on your answers, your project is:
            <div class="govuk-inset-text">
              <span class="govuk-heading-m">Eligible to apply</span>
              </div>
              <p class='govuk-body'>
              The RPA wants to fund projects that have a higher environmental benefit. <br/><br/>
              We will do this by prioritising projects in areas that need urgent action 
              to reduce nutrient pollution from agriculture and restore natural habitats.<br/><br/>
              Depending on the number of applications received, we may invite projects 
              outside these areas to submit a full application.</p>`,
            extraMessageContent: `
            <h2 class="govuk-heading-m">Next steps</h2>
            <p class="govuk-body">Next, add your business and contact details and submit them to the RPA (you should only do this once).
            <br/><br/>
            You’ll get an email with your answers and a reference number.</p>`
          },
          answers: []
        },

        /// ////// ***************** After Score  ************************************/////////////////////
        {
          key: 'business-details',
          order: 220,
          title: 'Business details',
          pageTitle: '',
          url: 'business-details',
          baseUrl: 'business-details',
          backUrl: 'result-page',
          nextUrl: 'applying',
          preValidationKeys: [],
          ga: [
            { dimension: 'cd1', value: { type: 'score', value: 'Eligible' } },
            { dimension: 'cm3', value: { type: 'journey-time' } }
          ],
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          allFields: [
            {
              yarKey: 'projectName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Project name',
                classes: 'govuk-label'
              },
              hint: {
                text: 'For example Browns Hill Farm calf housing project'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a project name'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'businessName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Business name',
                classes: 'govuk-label'
              },
              hint: {
                text: "If you're registered on the Rural Payments system, enter business name as registered"
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a business name'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'numberEmployees',
              type: 'number',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Number of employees',
                classes: 'govuk-label'
              },
              hint: {
                text: 'Full-time employees, including the owner'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter the number of employees'
                },
                {
                  type: 'REGEX',
                  regex: WHOLE_NUMBER_REGEX,
                  error: 'Number of employees must be a whole number, like 305'
                },
                {
                  type: 'MIN_MAX',
                  min: 1,
                  max: 9999999,
                  error: 'Number must be between 1-9999999'
                }
              ]
            },
            {
              yarKey: 'businessTurnover',
              type: 'number',
              classes: 'govuk-input--width-10',
              prefix: {
                text: '£'
              },
              label: {
                text: 'Business turnover (£)',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter the business turnover'
                },
                {
                  type: 'REGEX',
                  regex: WHOLE_NUMBER_REGEX,
                  error: 'Business turnover must be a whole number, like 100000'
                },
                {
                  type: 'MIN_MAX',
                  min: 1,
                  max: 999999999,
                  error: 'Number must be between 1-999999999'
                }
              ]
            },
            {
              yarKey: 'sbi',
              type: 'text',
              title: 'Single Business Identifier (SBI) - Optional',
              classes: 'govuk-input govuk-input--width-10',
              label: {
                text: 'Single Business Identifier (SBI) - Optional',
                classes: 'govuk-label'
              },
              hint: {
                html: 'If you do not have an SBI, you will need to get one for full application'
              },
              validate: [
                {
                  type: 'REGEX',
                  regex: SBI_REGEX,
                  error: 'SBI number must have 9 characters, like 011115678'
                }
              ]
            },
            {
              yarKey: 'calvingSystem',
              type: 'select',
              title: 'Calving system (optional)',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Calving system (optional)',
                classes: 'govuk-label'
              },
              answers: [
                'Year round',
                'Spring block',
                'Autumn block',
                'Other'
              ],
            },
            {
              yarKey: 'calvesNumber',
              type: 'text',
              title: 'Number of calves (optional)',
              classes: 'govuk-input--width-4',
              label: {
                text: 'Number of calves (optional)',
                classes: 'govuk-label'
              },
              hint: {
                text: 'Maximum number of calves housed annually after project'
              },
              validate: [
                {
                  type: 'REGEX',
                  regex: ONLY_DIGITS_REGEX,
                  error: 'Number of calves should only include numbers'
                },
                {
                  type: 'REGEX',
                  regex: WHOLE_NUMBER_REGEX,
                  error: 'Number of calves must be a whole number',
                },
                {
                  type: 'MIN_MAX',
                  min: 1,
                  max: 9999999,
                  error: 'Number must be between 1-9999999'
                }
              ]
            }
          ],
          yarKey: 'businessDetails'
        },
        {
          key: 'applying',
          order: 230,
          title: 'Who is applying for this grant?',
          pageTitle: '',
          url: 'applying',
          baseUrl: 'applying',
          backUrl: 'business-details',
          preValidationKeys: [],
          fundingPriorities: '',
          type: 'single-answer',
          classes: 'govuk-radios--inline govuk-fieldset__legend--l',
          minAnswerCount: 1,
          validate: [
            {
              type: 'NOT_EMPTY',
              error: 'Select who is applying for this grant'
            }
          ],
          answers: [
            {
              key: 'applying-A1',
              value: 'Applicant',
              redirectUrl: 'applicant-details'
            },
            {
              key: 'applying-A2',
              value: 'Agent',
              redirectUrl: 'agent-details'
            }
          ],
          yarKey: 'applying'
        },
        {
          key: 'farmer-details',
          order: 240,
          title: 'Applicant’s details',
          pageTitle: '',
          url: 'applicant-details',
          baseUrl: 'applicant-details',
          nextUrl: 'check-details',
          preValidationKeys: [],
          backUrlObject: {
            dependentQuestionYarKey: 'applying',
            dependentAnswerKeysArray: [ 'applying-A2' ],
            urlOptions: {
              thenUrl: 'agent-details',
              elseUrl: 'applying'
            }
          },
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          ga: [ { dimension: 'cd3', value: { type: 'yar', key: 'applying' } } ],
          hint: {
            text: 'Enter the farmer and farm business details'
          },
          allFields: [
            {
              type: 'sub-heading',
              text: 'Name'
            },
            {
              yarKey: 'firstName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'First name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your first name'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'lastName',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Last name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your last name'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              type: 'sub-heading',
              text: 'Contact details'
            },
            {
              yarKey: 'emailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Email address',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to send you confirmation'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your email address'
                },
                {
                  type: 'REGEX',
                  regex: EMAIL_REGEX,
                  error: 'Enter an email address in the correct format, like name@example.com'
                }
              ]
            },
            {
              yarKey: 'confirmEmailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Confirm email address',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Confirm your email address'
                },
                {
                  type: 'CONFIRMATION_ANSWER',
                  fieldsToCampare: [ 'emailAddress', 'confirmEmailAddress' ],
                  error: 'Enter an email address that matches'
                }
              ]
            },
            {
              yarKey: 'mobileNumber',
              type: 'tel',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Mobile number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY_EXTRA',
                  error: 'Enter a mobile number (if you do not have a mobile, enter your landline number)',
                  extraFieldsToCheck: [ 'landlineNumber' ]
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your mobile number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              yarKey: 'landlineNumber',
              endFieldset: 'true',
              type: 'tel',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Landline number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY_EXTRA',
                  error: 'Enter a landline number (if you do not have a landline, enter your mobile number)',
                  extraFieldsToCheck: [ 'mobileNumber' ]
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your landline number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              type: 'sub-heading',
              text: 'Business address'
            },
            {
              yarKey: 'address1',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 1',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your address line 1'
                },
                {
                  type: 'REGEX',
                  regex: ADDRESS_REGEX,
                  error: 'Address must only include letters, numbers, hyphens and apostrophes'
                }
              ]
            },
            {
              yarKey: 'address2',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 2 (optional)',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'REGEX',
                  regex: ADDRESS_REGEX,
                  error: 'Address must only include letters, numbers, hyphens and apostrophes'
                }
              ]
            },
            {
              yarKey: 'town',
              type: 'text',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Town',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your town'
                },
                {
                  type: 'REGEX',
                  regex: ONLY_TEXT_REGEX,
                  error: 'Town must only include letters'
                }
              ]
            },
            {
              yarKey: 'county',
              type: 'select',
              classes: 'govuk-input--width-10',
              label: {
                text: 'County',
                classes: 'govuk-label'
              },
              answers: [
                ...LIST_COUNTIES
              ],
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Select your county'
                }
              ]
            },
            {
              yarKey: 'postcode',
              type: 'text',
              classes: 'govuk-input--width-5',
              label: {
                text: 'Business postcode',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a business postcode, like AA1 1AA'
                },
                {
                  type: 'REGEX',
                  regex: POSTCODE_REGEX,
                  error: 'Enter a business postcode, like AA1 1AA'
                }
              ]
            },
            {
              yarKey: 'projectPostcode',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-5',
              label: {
                text: 'Project postcode',
                classes: 'govuk-label'
              },
              hint: {
                text: 'The site postcode where the work will happen'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter a project postcode, like AA1 1AA'
                },
                {
                  type: 'REGEX',
                  regex: POSTCODE_REGEX,
                  error: 'Enter a project postcode, like AA1 1AA'
                }
              ]
            }
          ],
          yarKey: 'farmerDetails'

        },
        {
          key: 'agent-details',
          order: 250,
          title: 'Agent’s details',
          hint: {
            text: 'Enter the agent and agent business details'
          },
          pageTitle: '',
          url: 'agent-details',
          baseUrl: 'agent-details',
          backUrl: 'applying',
          nextUrl: 'applicant-details',
          summaryPageUrl: 'check-details',
          preValidationKeys: [],
          ineligibleContent: {},
          fundingPriorities: '',
          type: 'multi-input',
          minAnswerCount: '',
          maxAnswerCount: '',
          allFields: [
            {
              type: 'sub-heading',
              text: 'Name'
            },
            {
              yarKey: 'firstName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'First name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your first name'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'lastName',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Last name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your last name'
                },
                {
                  type: 'REGEX',
                  regex: NAME_ONLY_REGEX,
                  error: 'Name must only include letters, hyphens and apostrophes'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              yarKey: 'businessName',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Business name',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your business name'
                },
                {
                  type: 'MIN_MAX_CHARS',
                  min: 0,
                  max: 100,
                  error: 'Name must be 100 characters or fewer'
                }
              ]
            },
            {
              type: 'sub-heading',
              text: 'Contact details'
            },
            {
              yarKey: 'emailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Email address',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to send you confirmation'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your email address'
                },
                {
                  type: 'REGEX',
                  regex: EMAIL_REGEX,
                  error: 'Enter an email address in the correct format, like name@example.com'
                }
              ]
            },
            {
              yarKey: 'confirmEmailAddress',
              type: 'email',
              classes: 'govuk-input--width-20',
              label: {
                text: 'Confirm email address',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Confirm your email address'
                },
                {
                  type: 'CONFIRMATION_ANSWER',
                  fieldsToCampare: [ 'emailAddress', 'confirmEmailAddress' ],
                  error: 'Enter an email address that matches'
                }
              ]
            },
            {
              yarKey: 'mobileNumber',
              type: 'tel',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Mobile phone number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY_EXTRA',
                  error: 'Enter a mobile number (if you do not have a mobile, enter your landline number)',
                  extraFieldsToCheck: [ 'landlineNumber' ]
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your mobile number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              yarKey: 'landlineNumber',
              type: 'tel',
              endFieldset: 'true',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Landline number',
                classes: 'govuk-label'
              },
              hint: {
                text: 'We will only use this to contact you about your application'
              },
              validate: [
                {
                  type: 'NOT_EMPTY_EXTRA',
                  error: 'Enter a landline number (if you do not have a landline, enter your mobile number)',
                  extraFieldsToCheck: [ 'mobileNumber' ]
                },
                {
                  type: 'REGEX',
                  regex: CHARS_MIN_10,
                  error: 'Your landline number must have at least 10 characters'
                },
                {
                  type: 'REGEX',
                  regex: PHONE_REGEX,
                  error: 'Enter a telephone number, like 01632 960 001, 07700 900 982 or +44 0808 157 0192'
                }
              ]
            },
            {
              type: 'sub-heading',
              text: 'Business address'
            },
            {
              yarKey: 'address1',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 1',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your address line 1'
                }
              ]
            },
            {
              yarKey: 'address2',
              type: 'text',
              classes: 'govuk-input--width-20',
              label: {
                html: 'Address line 2 (optional)',
                classes: 'govuk-label'
              }
            },
            {
              yarKey: 'town',
              type: 'text',
              classes: 'govuk-input--width-10',
              label: {
                text: 'Town',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your town'
                },
                {
                  type: 'REGEX',
                  regex: ONLY_TEXT_REGEX,
                  error: 'Town must only include letters'
                }
              ]
            },
            {
              yarKey: 'county',
              type: 'select',
              classes: 'govuk-input--width-10',
              label: {
                text: 'County',
                classes: 'govuk-label'
              },
              answers: [
                ...LIST_COUNTIES
              ],
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Select your county'
                }
              ]
            },
            {
              yarKey: 'postcode',
              type: 'text',
              endFieldset: 'true',
              classes: 'govuk-input--width-5',
              label: {
                text: 'Postcode',
                classes: 'govuk-label'
              },
              validate: [
                {
                  type: 'NOT_EMPTY',
                  error: 'Enter your postcode, like AA1 1AA'
                },
                {
                  type: 'REGEX',
                  regex: POSTCODE_REGEX,
                  error: 'Enter a postcode, like AA1 1AA'
                }
              ]
            }
          ],
          yarKey: 'agentsDetails'

        },
        {
          key: 'check-details',
          order: 260,
          title: 'Check your details',
          pageTitle: 'Check details',
          url: 'check-details',
          backUrl: 'applicant-details',
          nextUrl: 'confirm',
          preValidationKeys: [],
          ineligibleContent: {},
          pageData: {
            businessDetailsLink: 'business-details',
            agentDetailsLink: 'agent-details',
            farmerDetailsLink: 'applicant-details'
          },
          fundingPriorities: '',
          type: '',
          minAnswerCount: 1,
          answers: []
        },
        {
          key: 'confirm',
          title: 'Confirm and send',
          order: 270,
          url: 'confirm',
          backUrl: 'check-details',
          nextUrl: 'confirmation',
          preValidationKeys: [],
          maybeEligible: true,
          maybeEligibleContent: {
            messageHeader: 'Confirm and send',
            messageContent: `I confirm that, to the best of my knowledge, the details I have provided are correct.</br></br>
            I understand the project’s eligibility and score is based on the answers I provided.</br></br>
            I am aware that the information I submit will be:</br>
            <ul>
              <li>checked by the RPA</li>
              <li>shared with the Environment Agency so that they can check the details of my planned project</li>
            </ul></br>
            I am happy to be contacted by Defra and RPA (or third-party on their behalf) about my application.</br></br>
            So that we can continue to improve our services and schemes, we may wish to contact you in the future. Please confirm if you are happy for us, or a third-party working for us, to contact you.`
          },
          answers: [
            {
              key: 'consentOptional',
              value: 'CONSENT_OPTIONAL'
            }
          ],
          yarKey: 'consentOptional'
        },
        {
          key: 'reference-number',
          order: 280,
          title: 'Details submitted',
          pageTitle: '',
          url: 'confirmation',
          baseUrl: 'confirmation',
          preValidationKeys: [],
          ga: [
            { dimension: 'cd2', value: { type: 'score' } },
            { dimension: 'cd5', value: { type: 'confirmationId' } },
            { dimension: 'cm1', value: { type: 'journey-time' } }
          ],
          maybeEligible: true,
          maybeEligibleContent: {
            reference: {
              titleText: 'Details submitted',
              html: 'Your reference number<br><strong>{{_confirmationId_}}</strong>',
              surveyLink: process.env.SURVEY_LINK
            },
            messageContent: `We have sent you a confirmation email with a record of your answers.<br/><br/>
            If you do not get an email within 72 hours, please call the RPA helpline and follow the options for the Farming Transformation Fund scheme:<br/>
            <h2 class="govuk-heading-m">RPA helpline</h2>
            <h3 class="govuk-heading-s">Telephone</h3>
            Telephone: 0300 0200 301<br/>
            Monday to Friday, 9am to 5pm (except public holidays)<br/>
            <p><a class="govuk-link" target="_blank" href="https://www.gov.uk/call-charges" rel="noopener noreferrer">Find out about call charges</a></p>
            <h3 class="govuk-heading-s">Email</h3>
            <a class="govuk-link" title="Send email to RPA" target="_blank" rel="noopener noreferrer" href="mailto:ftf@rpa.gov.uk">FTF@rpa.gov.uk</a><br/><br/>
            
            <h2 class="govuk-heading-m">What happens next</h2>
            <p>1. RPA will be in touch when the full application period opens. They will tell you if your project scored well enough to get the full application form.</p>
            <p>2. If you submit an application, RPA will assess it against other projects and value for money. You will not automatically get a grant. The grant is expected to be highly competitive and you are competing against other projects.</p>
            <p>3. If your application is successful, you’ll be sent a funding agreement and can begin work on the project.</p>
            `,
            warning: {
              text: 'You must not start the project'
            },
            extraMessageContent: `<p>Starting the project or committing to any costs (such as placing orders) before you receive a funding agreement will invalidate your application.</p> 
            <p>Before you start the project, you can:</p>
            <ul>
              <li>get quotes from suppliers</li>
              <li>apply for planning permission or an abstraction licence</li>
            </ul>
            <p class="govuk-body"><a class="govuk-link" href="${process.env.SURVEY_LINK}" target="_blank" rel="noopener noreferrer">What do you think of this service?</a></p>
            `
          },
          fundingPriorities: '',
          type: '',
          minAnswerCount: 1,
          answers: []
        }
      ]
    }
  ]
}

const ALL_QUESTIONS = []
questionBank.sections.forEach(({ questions }) => {
  ALL_QUESTIONS.push(...questions)
})
const ALL_URLS = []
ALL_QUESTIONS.forEach(item => ALL_URLS.push(item.url))

const YAR_KEYS = [ 'itemsTotalValue', 'remainingCost', 'calculatedGrant' ]
ALL_QUESTIONS.forEach(item => YAR_KEYS.push(item.yarKey))
module.exports = {
  questionBank,
  ALL_QUESTIONS,
  YAR_KEYS,
  ALL_URLS
}
