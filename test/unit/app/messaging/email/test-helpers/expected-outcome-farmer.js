const { microEmployeesNum, microTurnover, smallEmployeesNum, smallTurnover, mediumEmployeesNum, mediumTurnover } = require('../../../../../../app/messaging/email/business-size-constants')

const envStr = process.env.EXCEL_UPLOAD_ENVIRONMENT

const expectedOutcomeFarmer = (testTimeConstant, sixMonthsLater, todayStr, numberEmployees = undefined, businessTurnover = undefined, businessSize = 'Large') => {
  return ({
    applicantEmail: {
      notifyTemplate: process.env.NOTIFY_EMAIL_TEMPLATE,
      emailAddress: 'farmer@site.com',
      details: {
        firstName: 'Fred',
        lastName: 'Armer',
        referenceNumber: '12345678',
        legalStatus: 'Sole trader',
        applicantType: 'pig',
        location: 'Yes',
        planningPermission: 'Yes',
        projectPostcode: 'TE12ST',
        projectStart: 'Yes, preparatory work',
        tenancy: 'Yes',
        isTenancyLength: 'Yes',
        tenancyLength: 'Yes',
        // projectCost: '£NaN',
        // potentialFunding: '£NaN',
        projectName: 'Test Project',
        projectType: '',
        businessName: 'Test Business',
        farmerName: 'Fred',
        farmerSurname: 'Armer',
        farmerEmail: 'farmer@site.com',
        isAgent: 'No',
        agentName: ' ',
        agentSurname: ' ',
        agentEmail: ' ',
        contactConsent: 'Yes',
        scoreDate: testTimeConstant.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
        // remainingCost: undefined,
        businessType: ''
      }
    },
    agentEmail: null,
    rpaEmail: null,
    spreadsheet: {
      filename: 'FTF-Cattle Housing_Test Project_Test Business_12345678_18-09-2022, 01:00.xlsx',
      uploadLocation: `Farming Investment Fund/Farming Transformation Fund/${envStr}/Cattle Housing/`,
      worksheets: [
        {
          title: 'DORA DATA',
          hideEmptyRows: false,
          defaultColumnWidth: 30,
          rows: [
            {
              row: 1,
              values: ['', 'Field Name', 'Field Value'],
              bold: true
            }, {
              row: 2,
              values: ['', 'FA or OA', 'Outline Application'],
              bold: false
            }, {
              row: 40,
              values: ['', 'Scheme', 'Farming Transformation Fund'],
              bold: false
            }, {
              row: 39,
              values: ['', 'Sub scheme', 'FTF-Cattle Housing'],
              bold: false
            }, {
              row: 43,
              values: ['', 'Theme', 'Cattle Housing Grants'],
              bold: false
            }, {
              row: 90,
              values: ['', 'Project type', 'Slurry Store and Cover'],
              bold: false
            }, {
              row: 41,
              values: ['', 'Owner', 'RD'],
              bold: false
            }, {
              row: 53,
              values: ['', 'Business type', 'pig farmer'],
              bold: false
            }, {
              row: 341,
              values: ['', 'Grant Launch Date', ''],
              bold: false
            }, {
              row: 23,
              values: ['', 'Status of applicant', 'Sole trader'],
              bold: false
            }, {
            //   row: 44,
            //   values: [
            //     '',
            //     'Project Items',
            //     'Above- ground steel slurry store~|I already have an impermeable cover~Solid roof or lid with a flat deck or conical shape made from inflexible material such as fibreglass panels or polyester sheets|Earth-bank lagoon with internal liner~100~m³|Fixed flexible cover~100~m³|Centrifugal chopper pump~10~item(s)|Slurry store wall mixers with store capacity up to 8,000 cubic metre~10 item(s)~item(s)'
            //   ],
            //   bold: false
            // }, {
              row: 45,
              values: ['', 'Location of project (postcode)', 'TE12ST'],
              bold: false
            }, {
              row: 376,
              values: ['', 'Project Started', 'Yes, preparatory work'],
              bold: false
            }, {
              row: 342,
              values: ['', 'Land owned by Farm', 'Yes'],
              bold: false
            }, {
              row: 343,
              values: ['', 'Tenancy for next 5 years', 'Yes'],
              bold: false
            }, {
            //   row: 55,
            //   values: ['', 'Total project expenditure', 'undefined'],
            //   bold: false
            // }, {
              row: 57,
              values: ['', 'Grant rate', '50'],
              bold: false
            }, {
            //   row: 56,
            //   values: ['', 'Grant amount requested', undefined],
            //   bold: false
            // },
            // {
            //   row: 345,
            //   values: ['', 'Remaining Cost to Farmer', 'Yes'],
            //   bold: false
            // }, {
              row: 346,
              values: ['', 'Planning Permission Status', 'Approved'],
              bold: false
            }, {
              row: 366,
              values: ['', 'Date of OA decision', ''],
              bold: false
            }, {
              row: 42,
              values: ['', 'Project name', 'Test Project'],
              bold: false
            }, {
              row: 4,
              values: ['', 'Single business identifier (SBI)', '000000000'],
              bold: false
            }, {
              row: 7,
              values: ['', 'Business name', 'Test Business'],
              bold: false
            }, {
              row: 367,
              values: ['', 'Annual Turnover', businessTurnover],
              bold: false
            }, {
              row: 22,
              values: ['', 'Employees', numberEmployees],
              bold: false
            }, {
              row: 20,
              values: ['', 'Business size', businessSize],
              bold: false
            }, {
              row: 91,
              values: ['', 'Are you an AGENT applying on behalf of your customer', 'No'],
              bold: false
            }, {
              row: 5,
              values: ['', 'Surname', 'Armer'],
              bold: false
            }, {
              row: 6,
              values: ['', 'Forename', 'Fred'],
              bold: false
            }, {
              row: 8,
              values: ['', 'Address line 1', undefined],
              bold: false
            },
            {
              row: 9,
              values: ['', 'Address line 2', undefined],
              bold: false
            }, {
              row: 10,
              values: ['', 'Address line 3', ''],
              bold: false
            }, {
              row: 11,
              values: ['', 'Address line 4 (town)', undefined],
              bold: false
            }, {
              row: 12,
              values: ['', 'Address line 5 (county)', undefined],
              bold: false
            },
            {
              row: 13,
              values: ['', 'Postcode (use capitals)', undefined],
              bold: false
            }, {
              row: 16,
              values: ['', 'Landline number', ''],
              bold: false
            }, {
              row: 17,
              values: ['', 'Mobile number', ''],
              bold: false
            }, {
              row: 18,
              values: ['', 'Email', 'farmer@site.com'],
              bold: false
            }, {
              row: 89,
              values: ['', 'Customer Marketing Indicator', 'Yes'],
              bold: false
            }, {
              row: 368,
              values: ['', 'Date ready for QC or decision', todayStr],
              bold: false
            }, {
              row: 369,
              values: ['', 'Eligibility Reference No.', '12345678'],
              bold: false
            }, {
              row: 94,
              values: ['', 'Current location of file', 'NA Automated'],
              bold: false
            }, {
              row: 92,
              values: ['', 'RAG rating', 'Green'],
              bold: false
            }, {
              row: 93,
              values: ['', 'RAG date reviewed ', todayStr],
              bold: false
            }, {
              row: 54,
              values: ['', 'Electronic OA received date ', todayStr],
              bold: false
            }, {
              row: 370,
              values: ['', 'Status', 'Pending RPA review'],
              bold: false
            }, {
              row: 85,
              values: ['', 'Full Application Submission Date', (new Date(sixMonthsLater)).toLocaleDateString('en-GB')],
              bold: false
            }, {
              row: 375,
              values: ['', 'OA percent', 0],
              bold: false
            }, {
              row: 365,
              values: ['', 'OA score', 0],
              bold: false
            }, {
              row: 26,
              values: ['', 'Agent Surname', ''],
              bold: false
            }, {
              row: 27,
              values: ['', 'Agent Forename', ''],
              bold: false
            }, {
              row: 29,
              values: ['', 'Agent Address line 1', ''],
              bold: false
            }, {
              row: 30,
              values: ['', 'Agent Address line 2', ''],
              bold: false
            }, {
              row: 31,
              values: ['', 'Agent Address line 3', ''],
              bold: false
            }, {
              row: 32,
              values: ['', 'Agent Address line 4 (town)', ''],
              bold: false
            }, {
              row: 33,
              values: ['', 'Agent Address line 5 (County)', ''],
              bold: false
            }, {
              row: 34,
              values: ['', 'Agent Postcode (use capitals)', ''],
              bold: false
            }, {
              row: 35,
              values: ['', 'Agent Landline number', ''],
              bold: false
            }, {
              row: 36,
              values: ['', 'Agent Mobile number', ''],
              bold: false
            }, {
              row: 37,
              values: ['', 'Agent Email', ''],
              bold: false
            }, {
              row: 28,
              values: ['', 'Agent Business Name', ''],
              bold: false
            }]
        }
      ]
    }
  })
}

const expectedOutcomeFarmerMicro = (testTimeConstant, sixMonthsLater, todayStr) => expectedOutcomeFarmer(testTimeConstant, sixMonthsLater, todayStr, microEmployeesNum - 1, microTurnover - 1, 'Micro')

const expectedOutcomeFarmerSmall = (testTimeConstant, sixMonthsLater, todayStr) => expectedOutcomeFarmer(testTimeConstant, sixMonthsLater, todayStr, smallEmployeesNum - 1, smallTurnover - 1, 'Small')

const expectedOutcomeFarmerMedium = (testTimeConstant, sixMonthsLater, todayStr) => expectedOutcomeFarmer(testTimeConstant, sixMonthsLater, todayStr, mediumEmployeesNum - 1, mediumTurnover - 1, 'Medium')

module.exports = {
  expectedOutcomeFarmer,
  expectedOutcomeFarmerMicro,
  expectedOutcomeFarmerSmall,
  expectedOutcomeFarmerMedium
}
