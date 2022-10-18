const envStr = process.env.EXCEL_UPLOAD_ENVIRONMENT

const expectedOutcomeAgent = (testTimeConstant, sixMonthsLater, todayStr) => ({
  applicantEmail: {
    notifyTemplate: process.env.NOTIFY_EMAIL_TEMPLATE,
    emailAddress: 'farmer@site.com',
    details: {
      firstName: 'Fred',
      lastName: 'Armer',
      referenceNumber: '12345678',
      legalStatus: 'Sole trader',
      applicantType: ' ',
      location: 'Yes',
      systemType: 'Slurry-based system',
      existingStorageCapacity: 'Less than 6 months',
      plannedStorageCapacity: '6 months',
      cover: ' ',
      coverSize: 'N/A',
      itemSizeQuantities: 'None selected',
      coverType: 'Not needed',
      storageType: 'Above- ground steel slurry store',
      planningAuthority: ' ',
      planningReferenceNumber: ' ',
      planningPermission: 'Yes',
      projectPostcode: 'TE12ST',
      projectStart: 'Yes, preparatory work',
      serviceCapacityIncrease: '',
      tenancy: 'Yes',
      isTenancyLength: 'No',
      tenancyLength: ' ',
      projectCost: '£NaN',
      potentialFunding: '£NaN',
      gridReference: 'A1',
      projectName: 'Test Project',
      projectType: '',
      businessName: 'Test Business',
      farmerName: 'Fred',
      farmerSurname: 'Armer',
      farmerEmail: 'farmer@site.com',
      isAgent: 'Yes',
      agentName: 'Adam',
      agentSurname: 'Gent',
      agentEmail: 'agent@site.com',
      contactConsent: 'No',
      scoreDate: (new Date(testTimeConstant)).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      remainingCost: undefined,
      businessType: ''
    }
  },
  agentEmail: {
    notifyTemplate: process.env.NOTIFY_EMAIL_TEMPLATE,
    emailAddress: 'agent@site.com',
    details: {
      firstName: 'Adam',
      lastName: 'Gent',
      referenceNumber: '12345678',
      legalStatus: 'Sole trader',
      applicantType: ' ',
      location: 'Yes',
      systemType: 'Slurry-based system',
      existingStorageCapacity: 'Less than 6 months',
      plannedStorageCapacity: '6 months',
      cover: ' ',
      coverSize: 'N/A',
      itemSizeQuantities: 'None selected',
      coverType: 'Not needed',
      storageType: 'Above- ground steel slurry store',
      planningAuthority: ' ',
      planningReferenceNumber: ' ',
      planningPermission: 'Yes',
      projectPostcode: 'TE12ST',
      projectStart: 'Yes, preparatory work',
      serviceCapacityIncrease: '',
      tenancy: 'Yes',
      isTenancyLength: 'No',
      tenancyLength: ' ',
      projectCost: '£NaN',
      potentialFunding: '£NaN',
      gridReference: 'A1',
      projectName: 'Test Project',
      projectType: '',
      businessName: 'Test Business',
      farmerName: 'Fred',
      farmerSurname: 'Armer',
      farmerEmail: 'farmer@site.com',
      isAgent: 'Yes',
      agentName: 'Adam',
      agentSurname: 'Gent',
      agentEmail: 'agent@site.com',
      contactConsent: 'No',
      scoreDate: new Date(testTimeConstant).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      businessType: '',
      remainingCost: undefined
    }
  },
  rpaEmail: null,
  spreadsheet: {
    filename: 'FTF-Slurry Infrastructure_Test Project_Test Business_12345678_18-09-2022, 01:00.xlsx',
    uploadLocation: `Farming Investment Fund/Farming Transformation Fund/${envStr}/Slurry Infrastructure/`,
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
            values: ['', 'Sub scheme', 'FTF-Slurry Infrastructure'],
            bold: false
          }, {
            row: 43,
            values: ['', 'Theme', 'Slurry Infrastructure Grants'],
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
            values: ['', 'Business type', 'farmer with livestock'],
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
            row: 44,
            values: [
              '',
              'Project Items',
              'Above- ground steel slurry store~||'
            ],
            bold: false
          }, {
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
            values: ['', 'Tenancy for next 5 years', ''],
            bold: false
          }, {
            row: 395,
            values: ['', 'System Type', 'Slurry-based system'],
            bold: false
          }, {
            row: 396,
            values: ['', 'Existing Storage Capacity', 'Less than 6 months'],
            bold: false
          }, {
            row: 397,
            values: ['', 'Planned Storage Capacity', '6 months'],
            bold: false
          }, {
            row: 398,
            values: ['', 'Slurry Storage Improvement Method', ''],
            bold: false
          }, {
            row: 399,
            values: ['', 'Impermeable cover', undefined],
            bold: false
          }, {
            row: 55,
            values: ['', 'Total project expenditure', 'undefined'],
            bold: false
          }, {
            row: 57,
            values: ['', 'Grant rate', '50'],
            bold: false
          }, {
            row: 56,
            values: ['', 'Grant amount requested', undefined],
            bold: false
          },
          {
            row: 345,
            values: ['', 'Remaining Cost to Farmer', 'Yes'],
            bold: false
          }, {
            row: 346,
            values: ['', 'Planning Permission Status', 'Approved'],
            bold: false
          }, {
            row: 400,
            values: ['', 'Planning Authority', ''],
            bold: false
          }, {
            row: 401,
            values: ['', 'Planning Reference No', ''],
            bold: false
          }, {
            row: 402,
            values: ['', 'OS Grid Reference', 'A1'],
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
            values: ['', 'Annual Turnover', undefined],
            bold: false
          }, {
            row: 22,
            values: ['', 'Employees', undefined],
            bold: false
          }, {
            row: 20,
            values: ['', 'Business size', 'Large'],
            bold: false
          }, {
            row: 91,
            values: ['', 'Are you an AGENT applying on behalf of your customer', 'Yes'],
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
            values: ['', 'Customer Marketing Indicator', 'No'],
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
            values: ['', 'Agent Surname', 'Gent'],
            bold: false
          }, {
            row: 27,
            values: ['', 'Agent Forename', 'Adam'],
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
            values: ['', 'Agent Email', 'agent@site.com'],
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

module.exports = expectedOutcomeAgent
