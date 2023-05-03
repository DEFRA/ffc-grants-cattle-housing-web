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
    generateRow(31, 'Agent Address line 3', ''),
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
  return (typeof businessType === 'string') ? `${businessType} farmer` : 'farmer with livestock'
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
  const schemeName = 'Cattle Housing'
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
          generateRow(2, 'FA or OA', 'Outline Application'),
          generateRow(40, 'Scheme', 'Farming Transformation Fund'),
          generateRow(39, 'Sub scheme', subScheme),
          generateRow(43, 'Theme', 'Cattle Housing Grants'),
          generateRow(90, 'Project type', 'Slurry Store and Cover'),
          generateRow(41, 'Owner', 'RD'),
          generateRow(53, 'Business type', getBusinessTypeC53(submission.applicantType)),
          generateRow(341, 'Grant Launch Date', ''),
          generateRow(23, 'Status of applicant', submission.legalStatus),
          // generateRow(44, 'Project Items', getProjectItemsFormattedArray(submission.itemSizeQuantities, [submission.otherItems].flat(), submission.storageType, submission.serviceCapacityIncrease, submission.coverType, submission.coverSize)),
          generateRow(45, 'Location of project (postcode)', submission.farmerDetails.projectPostcode),
          generateRow(376, 'Project Started', submission.projectStart),
          generateRow(342, 'Land owned by Farm', submission.tenancy),
          generateRow(343, 'Tenancy for next 5 years', submission.tenancyLength ?? ''),
          // generateRow(55, 'Total project expenditure', String(submission.itemsTotalValue).replace(/,/g, '')),
          generateRow(57, 'Grant rate', '50'),
          // generateRow(56, 'Grant amount requested', submission.calculatedGrant),
          // generateRow(345, 'Remaining Cost to Farmer', submission.remainingCost),
          generateRow(346, 'Planning Permission Status', getPlanningPermissionDoraValue(submission.planningPermission)),
          generateRow(366, 'Date of OA decision', ''),
          generateRow(42, 'Project name', submission.businessDetails.projectName),
          generateRow(4, 'Single business identifier (SBI)', submission.businessDetails.sbi || '000000000'), // sbi is '' if not set so use || instead of ??
          generateRow(7, 'Business name', submission.businessDetails.businessName),
          generateRow(367, 'Annual Turnover', submission.businessDetails.businessTurnover),
          generateRow(22, 'Employees', submission.businessDetails.numberEmployees),
          generateRow(20, 'Business size', calculateBusinessSize(submission.businessDetails.numberEmployees, submission.businessDetails.businessTurnover)),
          generateRow(91, 'Are you an AGENT applying on behalf of your customer', submission.applying === 'Agent' ? 'Yes' : 'No'),
          generateRow(5, 'Surname', submission.farmerDetails.lastName),
          generateRow(6, 'Forename', submission.farmerDetails.firstName),
          generateRow(8, 'Address line 1', submission.farmerDetails.address1),
          generateRow(9, 'Address line 2', submission.farmerDetails.address2),
          generateRow(10, 'Address line 3', ''),
          generateRow(11, 'Address line 4 (town)', submission.farmerDetails.town),
          generateRow(12, 'Address line 5 (county)', submission.farmerDetails.county),
          generateRow(13, 'Postcode (use capitals)', submission.farmerDetails.postcode),
          generateRow(16, 'Landline number', submission.farmerDetails.landlineNumber ?? ''),
          generateRow(17, 'Mobile number', submission.farmerDetails.mobileNumber ?? ''),
          generateRow(18, 'Email', submission.farmerDetails.emailAddress),
          generateRow(89, 'Customer Marketing Indicator', submission.consentOptional ? 'Yes' : 'No'),
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
      calfWeight: submission.calfWeight,
      livingSpace: submission.livingSpace,
      housedIndividually: submission.housedIndividually,
      isolateCalves: submission.isolateCalves,
      strawBedding: submission.strawBedding,
      concreteFlooring: submission.concreteFlooring,
      enrichment: submission.enrichment,
      structure: submission.structure,
      structureEligibility: submission.structureEligibility === 'Yes' ? submission.yesStructureEligibility : submission.structureEligibility ?? 'N/A',
      draughtProtection:submission.draughtProtection,
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
      floorSpace: submission.floorSpace,
      floorSpaceScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'floor-space'),
      environmentalImpact: submission.environmentalImpact,
      environmentalImpactScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'environmental-impact'),
      sustainableMaterials: submission.sustainableMaterials,
      sustainableMaterialsScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'sustainable-materials'),
      introducingInnovation: submission.introducingInnovation,
      introducingInnovationScore: getQuestionScoreBand(desirabilityScore.desirability.questions, 'introducing-innovation'),
      projectName: submission.businessDetails.projectName,
      projectType: submission.projectType,
      calvingSystem: submission.businessDetails.calvingSystem ?? 'N/A',
      calvesNumber: submission.businessDetails.calvesNumber ?? 'N/A',
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
