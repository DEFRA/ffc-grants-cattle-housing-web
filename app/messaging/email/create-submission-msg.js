const emailConfig = require('./config/email')
const spreadsheetConfig = require('./config/spreadsheet')
const { microTurnover, smallTurnover, mediumTurnover, microEmployeesNum, smallEmployeesNum, mediumEmployeesNum } = require('./business-size-constants')

function getQuestionScoreBand (questions, questionKey) {
  return questions.filter(question => question.key === questionKey).length > 0
    ? questions.find(question => question.key === questionKey).rating.band
    : ''
}

function generateRow (rowNumber, name, value, bold = false) {
  return {
    row: rowNumber,
    values: ['', name, value],
    bold
  }
}

function calculateBusinessSize (employees, turnover) {
  const employeesNum = Number(employees)
  const turnoverNum = Number(turnover)

  if (employeesNum < microEmployeesNum && turnoverNum < microTurnover) { // €2m turnover
    return 'Micro'
  } else if (employeesNum < smallEmployeesNum && turnoverNum < smallTurnover) { // €10m turnover
    return 'Small'
  } else if (employeesNum < mediumEmployeesNum && turnoverNum < mediumTurnover) { // €50m turnover
    return 'Medium'
  } else {
    return 'Large'
  }
}

function addAgentDetails (agentsDetails) {
  return [
    generateRow(26, 'Agent Surname', agentsDetails?.lastName ?? ''),
    generateRow(27, 'Agent Forename', agentsDetails?.firstName ?? ''),
    generateRow(29, 'Agent Address line 1', agentsDetails?.address1 ?? ''),
    generateRow(30, 'Agent Address line 2', agentsDetails?.address2 ?? ''),
    generateRow(32, 'Agent Address line 4 (town)', agentsDetails?.town ?? ''),
    generateRow(33, 'Agent Address line 5 (County)', agentsDetails?.county ?? ''),
    generateRow(34, 'Agent Postcode (use capitals)', agentsDetails?.postcode ?? ''),
    generateRow(35, 'Agent Landline number', agentsDetails?.landlineNumber ?? ''),
    generateRow(36, 'Agent Mobile number', agentsDetails?.mobileNumber ?? ''),
    generateRow(37, 'Agent Email', agentsDetails?.emailAddress ?? ''),
    generateRow(28, 'Agent Business Name', agentsDetails?.businessName ?? '')
  ]
}

function generateExcelFilename (scheme, projectName, businessName, referenceNumber, today) {
  const dateTime = new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'short',
    dateStyle: 'short',
    timeZone: 'Europe/London'
  }).format(today).replace(/\//g, '-')
  return `${scheme}_${projectName}_${businessName}_${referenceNumber}_${dateTime}.xlsx`
}
function getBusinessTypeC53 (businessType) {
  for (type in businessType) {
    type = 'Farmer with ' + type
  }
  return businessType

  //if beef farmer, "Farmer with Beef (including calf rearing)"
  // if dairy farmer, "Farmer with Dairy (including calf rearing)"
  // if other, "Farmer with livestock" 

  // set mapping  for other cells too? c431-440
}

const getPlanningPermissionDoraValue = (planningPermission) => {
  switch (planningPermission) {
    case 'Applied for but not yet approved':
      return 'Applied for'
    case 'Not yet applied for but expected to be in place by 31 December 2023':
      return 'Not yet applied for'
    default:
      return 'Approved'
  }
}

// function getProjectItemsFormattedArray (itemSizeQuantities, otherItems, storageType, storageCapacity, coverType, coverSize) {
//   const projectItems = []
//   if (otherItems[0] !== 'None of the above') {
//     let unit
//     Object.values(itemSizeQuantities).forEach((itemSizeQuantity, index) => {
//       unit = getItemUnit(otherItems[index].toLowerCase())
//       projectItems.push(`${otherItems[index]}~${itemSizeQuantity}~${unit}`)
//     })
//   } else {
//     projectItems.push('')
//   }

//   if (coverType && coverType !== 'Not needed') {
//     projectItems.unshift(`${coverType}~${coverSize}`)
//   } else {
//     projectItems.unshift('')
//   }

//   projectItems.unshift(`${storageType}~${storageCapacity}`)
//   return projectItems.join('|')
// }

function getSpreadsheetDetails (submission, desirabilityScore) {
  const today = new Date()
  const todayStr = today.toLocaleDateString('en-GB')
  const schemeName = 'Calf Housing for Health and Welfare'
  const subScheme = `FTF-${schemeName}`

  return {
    filename: generateExcelFilename(
      subScheme.trim(),
      submission.businessDetails.projectName.trim(),
      submission.businessDetails.businessName.trim(),
      submission.confirmationId.trim(),
      today
    ),
    uploadLocation: `Farming Investment Fund/Farming Transformation Fund/${spreadsheetConfig.uploadEnvironment}/Cattle Housing/`,
    worksheets: [
      {
        title: 'DORA DATA',
        ...(spreadsheetConfig.protectEnabled ? { protectPassword: spreadsheetConfig.protectPassword } : {}),
        hideEmptyRows: spreadsheetConfig.hideEmptyRows,
        defaultColumnWidth: 30,
        rows: [
          generateRow(1, 'Field Name', 'Field Value', true),
          generateRow(2, 'FA or OA(EOI):', 'Outline Application'),
          generateRow(40, 'Scheme', 'Farming Transformation Fund'),
          generateRow(39, 'Sub scheme', subScheme),
          generateRow(43, 'Theme', schemeName),
          generateRow(90, 'Sub-Theme / Project type', subScheme),
          generateRow(41, 'Owner', 'RD'),
          generateRow(53, 'Business type (Plus animal numbers)', getBusinessTypeC53(submission.applicantType)), // design action
          generateRow(341, 'Grant Launch Date', ''),
          generateRow(23, 'Business Form Classification (Status of Applicant)', submission.legalStatus),
          generateRow(405, 'Project Type', submission.project), // row 26 default value?
          generateRow(406, 'Calf Weight', submission.calfWeight), // check if values still received
          generateRow(407, 'Minimum floor area', submission.minimumFloorArea), // check once merge main
          generateRow(408, 'Calves Housed Individually', submission.housedIndividually),
          generateRow(409, 'Isolate Sick Calves', submission.isolateCalves),
          generateRow(410, 'Straw Bedding', subnmission.strawBedding),
          generateRow(411, 'Flooring and Bedding', submission.concreteFlooring),
          generateRow(412, 'Enrichment', submission.enrichment),
          generateRow(413, 'Building Structure', submission.structure),
          generateRow(414, 'Other Building Structure', submission.yesStructureEligibility ?? submission.structureEligibility),
          generateRow(415, 'Drainage', submission.drainageSlope),
          generateRow(416, 'Draught Protection', submission.draughtProtection),
          generateRow(417, 'Additional Items', submission.additionalItems),
          generateRow(418, 'Lighting', submission.lighting), // new lighting page 
          generateRow(419, 'Solar PV Panels', submission.roofSolarPV),

          generateRow(420, 'Moving from Individually Housed', submission.housing),
          generateRow(421, 'Average Calf Size Group', submission.calfGroupSize),
          generateRow(423, 'Moisture Control', submission.moistureControl),
          generateRow(424, 'Permanent Sick Pen', submission.permanentSickPen),
          generateRow(426, 'Environmental Impact', submission.environmentalImpact),
          generateRow(427, 'Sustainable Materials', submission.sustainableMaterials),
          generateRow(428, 'Introducing Innovation', submission.introducingInnovation),

          // 44 projecttype + buildingstructure + other building structure?  ROW 25

          generateRow(431, 'Farmer with Beef (including calf rearing)'),
          generateRow(432, 'Farmer with Dairy (including calf rearing)'),
          generateRow(434, 'Farmer with Pigs'),
          generateRow(435, 'Farmer with Sheep'),
          generateRow(436, 'Farmer with Laying Hens'),
          generateRow(437, 'Farmer with Meat Chickens'),
          generateRow(438, 'Farmer with Aquaculture'),
          generateRow(439, 'Farmer with Horticulture'),
          generateRow(440, 'Other'),

          generateRow(45, 'Location of project (postcode)', submission.farmerDetails.projectPostcode), 
          generateRow(376, 'Project Started', submission.projectStart),
          generateRow(342, 'Land owned by Farm', submission.tenancy),
          generateRow(343, 'Tenancy for next 5 years', submission.tenancyLength ?? ''),
          generateRow(55, 'Total project expenditure', String(submission.projectCost.toFixed(2))),
          generateRow(57, 'Grant rate', '40'),
          generateRow(56, 'Grant amount requested', submission.calculatedGrant),
          generateRow(345, 'Remaining Cost to Farmer', submission.remainingCost),
          generateRow(346, 'Planning Permission Status', getPlanningPermissionDoraValue(submission.planningPermission)),
          generateRow(366, 'Date of OA decision', ''),
          generateRow(42, 'Project name', submission.businessDetails.projectName),
          generateRow(4, 'Single business identifier (SBI)', submission.businessDetails.sbi || '000000000'), // sbi is '' if not set so use || instead of ??
          generateRow(429, 'Calving System', submission.businessDetails.calvingSystem ?? ''),
          generateRow(430, 'Number of Calves', submission.businessDetails.calvesNumber ?? ''),
          generateRow(7, 'Business name', submission.businessDetails.businessName),
          generateRow(367, 'Annual Turnover', submission.businessDetails.businessTurnover),
          generateRow(22, 'Employees', submission.businessDetails.numberEmployees),
          generateRow(20, 'Business size', calculateBusinessSize(submission.businessDetails.numberEmployees, submission.businessDetails.businessTurnover)),
          generateRow(91, 'Are you an AGENT applying on behalf of your customer', submission.applying === 'Agent' ? 'Yes' : 'No'),
          generateRow(5, 'Surname', submission.farmerDetails.lastName),
          generateRow(6, 'Forename', submission.farmerDetails.firstName),
          generateRow(8, 'Address line 1', submission.farmerDetails.address1),
          generateRow(9, 'Address line 2', submission.farmerDetails.address2),
          generateRow(11, 'Address line 4 (town)', submission.farmerDetails.town),
          generateRow(12, 'Address line 5 (county)', submission.farmerDetails.county),
          generateRow(13, 'Postcode (use capitals)', submission.farmerDetails.postcode),
          generateRow(16, 'Landline number', submission.farmerDetails.landlineNumber ?? ''),
          generateRow(17, 'Mobile number', submission.farmerDetails.mobileNumber ?? ''),
          generateRow(18, 'Email', submission.farmerDetails.emailAddress),
          generateRow(89, 'Customer Marketing Indicator: So that we can continue to improve our services and schemes, we may wish to contact you in the future. Please indicate if you are happy for us, or a third party working for us, to contact you', submission.consentOptional ? 'Yes' : 'No'),
          generateRow(368, 'Date ready for QC or decision', todayStr),
          generateRow(369, 'Eligibility Reference No.', submission.confirmationId),
          generateRow(94, 'Current location of file', 'NA Automated'),
          generateRow(92, 'RAG rating', 'Green'),
          generateRow(93, 'RAG date reviewed ', todayStr),
          generateRow(54, 'Electronic OA received date ', todayStr),
          generateRow(370, 'Status', 'Pending RPA review'),
          generateRow(85, 'Full Application Submission Date', (new Date(today.setMonth(today.getMonth() + 6))).toLocaleDateString('en-GB')),
          generateRow(375, 'OA percent', String(desirabilityScore.desirability.overallRating.score)),
          generateRow(365, 'OA score', desirabilityScore.desirability.overallRating.band),
          ...addAgentDetails(submission.agentsDetails)
        ]
      }
    ]
  }
}

function getCurrencyFormat (amount) {
  return Number(amount).toLocaleString('en-US', { minimumFractionDigits: 0, style: 'currency', currency: 'GBP' })
}

// const getItemUnit = (otherItem) => {
//   if (otherItem.includes('pump') || otherItem.includes('slurry store')) {
//     return 'item(s)'
//   } else if (otherItem.includes('pipework') || otherItem.includes('channels') || otherItem.includes('below ground')) {
//     return 'm'
//   } else {
//     return 'm³'
//   }
// }

// function displayObject (itemSizeQuantities, otherItems) {
//   let unit
//   const projectItems = Object.values(itemSizeQuantities).map((itemSizeQuantity, index) => {
//     unit = getItemUnit(otherItems[index].toLowerCase())
//     return `${otherItems[index]}: ${itemSizeQuantity} ${unit}`
//   })
//   console.log(projectItems)
//   return projectItems
// }

function getScoreChance (rating) {
  switch (rating.toLowerCase()) {
    case 'strong':
      return 'seems likely to'
    case 'average':
      return 'might'
    default:
      return 'seems unlikely to'
  }
}

function getEmailDetails (submission, desirabilityScore, rpaEmail, isAgentEmail = false) {
  const email = isAgentEmail ? submission.agentsDetails.emailAddress : submission.farmerDetails.emailAddress
  return {
    notifyTemplate: emailConfig.notifyTemplate,
    emailAddress: rpaEmail || email,
    details: {
      firstName: isAgentEmail ? submission.agentsDetails.firstName : submission.farmerDetails.firstName,
      lastName: isAgentEmail ? submission.agentsDetails.lastName : submission.farmerDetails.lastName,
      referenceNumber: submission.confirmationId,
      overallRating: desirabilityScore.desirability.overallRating.band,
      scoreChance: getScoreChance(desirabilityScore.desirability.overallRating.band),
      legalStatus: submission.legalStatus,
      applicantType: submission.applicantType ? [submission.applicantType].flat().join(', ') : ' ',
      location: submission.inEngland,
      planningPermission: submission.planningPermission,
      projectPostcode: submission.farmerDetails.projectPostcode,
      projectStart: submission.projectStart,
      tenancy: submission.tenancy,
      tenancyAgreement: submission.tenancyLength ?? 'N/A',
      project: submission.project,
      minimumFloorArea: submission.minimumFloorArea,
      housedIndividually: submission.housedIndividually,
      isolateCalves: submission.isolateCalves,
      strawBedding: submission.strawBedding,
      concreteFlooring: submission.concreteFlooring,
      enrichment: submission.enrichment,
      structure: submission.structure,
      structureEligibility: submission.structureEligibility === 'Yes' ? submission.yesStructureEligibility : submission.structureEligibility ?? 'N/A',
      draughtProtection: submission.draughtProtection,
      drainageSlope: submission.drainageSlope,
      additionalItems: submission.additionalItems,
      roofSolarPV: submission.roofSolarPV,
      projectCost: getCurrencyFormat(submission.projectCost),
      potentialFunding: getCurrencyFormat(submission.calculatedGrant),
      remainingCost: submission.remainingCosts,
      housing: submission.housing,
      housingScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'housing'),
      calfGroupSize: submission.calfGroupSize,
      calfGroupSizeScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'calf-group-size'),
      moistureControl: submission.moistureControl,
      moistureControlScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'moisture-control'),
      permanentSickPen: submission.permanentSickPen,
      permanentSickPenScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'permanent-sick-pen'),
      environmentalImpact: submission.environmentalImpact,
      environmentalImpactScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'environmental-impact'),
      sustainableMaterials: submission.sustainableMaterials,
      sustainableMaterialsScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'sustainable-materials'),
      introducingInnovation: submission.introducingInnovation,
      introducingInnovationScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'introducing-innovation'),
      projectName: submission.businessDetails.projectName,
      projectType: submission.projectType,
      calvingSystem: submission.businessDetails.calvingSystem ? submission.businessDetails.calvingSystem : 'N/A',
      calvesNumber: submission.businessDetails.calvesNumber ? submission.businessDetails.calvesNumber : 'N/A',
      businessName: submission.businessDetails.businessName,
      farmerName: submission.farmerDetails.firstName,
      farmerSurname: submission.farmerDetails.lastName,
      farmerEmail: submission.farmerDetails.emailAddress,
      agentName: submission.agentsDetails?.firstName ?? 'N/A',
      agentSurname: submission.agentsDetails?.lastName ?? ' ',
      agentBusinessName: submission.agentsDetails?.businessName ?? 'N/A',
      agentEmail: submission.agentsDetails?.emailAddress ?? 'N/A',
      contactConsent: submission.consentOptional ? 'Yes' : 'No',
      scoreDate: new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }),
      businessType: submission.applicantBusiness
    }
  }
}

function spreadsheet (submission, desirabilityScore) {
  const data = getSpreadsheetDetails(submission, desirabilityScore)
  return data
}

module.exports = function (submission, desirabilityScore, rating='') {
  return {
    applicantEmail: getEmailDetails(submission, desirabilityScore, false),
    agentEmail: submission.applying === 'Agent' ? getEmailDetails(submission,desirabilityScore, false, true) : null,
    rpaEmail: spreadsheetConfig.sendEmailToRpa ? getEmailDetails(submission, desirabilityScore, spreadsheetConfig.rpaEmail) : null,
    spreadsheet: spreadsheet(submission, desirabilityScore),
    getScoreChance:getScoreChance(rating)
  }
}
