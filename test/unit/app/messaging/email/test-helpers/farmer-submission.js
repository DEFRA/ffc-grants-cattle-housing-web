const { mediumTurnover, microTurnover, smallTurnover, microEmployeesNum, smallEmployeesNum, mediumEmployeesNum } = require('../../../../../../app/messaging/email/business-size-constants')
const agentSubmissionForFarmer = require('./agent-submission-for-farmer')

const farmerSubmission = { ...agentSubmissionForFarmer }
delete farmerSubmission.agentsDetails
delete farmerSubmission.applying
farmerSubmission.tenancyLength = 'Yes'
farmerSubmission.PlanningPermissionEvidence = {
  planningAuthority: 'Test',
  planningReferenceNumber: 'TE01'
}
farmerSubmission.applicantType = 'pig'
farmerSubmission.cover = 'Yes'
farmerSubmission.coverSize = 'Solid roof or lid with a flat deck or conical shape made from inflexible material such as fibreglass panels or polyester sheets'
farmerSubmission.coverType = 'I already have an impermeable cover'
farmerSubmission.itemSizeQuantities = [
  '100',
  '100',
  '10',
  '10 item(s)'
]
farmerSubmission.otherItems = [
  'Earth-bank lagoon with internal liner',
  'Fixed flexible cover',
  'Centrifugal chopper pump',
  'Slurry store wall mixers with store capacity up to 8,000 cubic metre'
]
farmerSubmission.consentOptional = true

const farmerSubmissionMicroTurnover = JSON.parse(JSON.stringify(farmerSubmission))
farmerSubmissionMicroTurnover.businessDetails.businessTurnover = microTurnover - 1
farmerSubmissionMicroTurnover.businessDetails.numberEmployees = microEmployeesNum - 1

const farmerSubmissionSmallTurnover = JSON.parse(JSON.stringify(farmerSubmission))
farmerSubmissionSmallTurnover.businessDetails.businessTurnover = smallTurnover - 1
farmerSubmissionSmallTurnover.businessDetails.numberEmployees = smallEmployeesNum - 1

const farmerSubmissionMediumTurnover = JSON.parse(JSON.stringify(farmerSubmission))
farmerSubmissionMediumTurnover.businessDetails.businessTurnover = mediumTurnover - 1
farmerSubmissionMediumTurnover.businessDetails.numberEmployees = mediumEmployeesNum - 1

module.exports = {
  farmerSubmission,
  farmerSubmissionMicroTurnover,
  farmerSubmissionMediumTurnover,
  farmerSubmissionSmallTurnover
}
