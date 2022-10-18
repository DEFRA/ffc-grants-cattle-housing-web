const agentSubmissionForFarmer = {
  applying: 'Agent',
  consentOptional: false,
  otherItems: 'None of the above',
  agentsDetails: {
    emailAddress: 'agent@site.com',
    firstName: 'Adam',
    lastName: 'Gent'
  },
  farmerDetails: {
    emailAddress: 'farmer@site.com',
    firstName: 'Fred',
    lastName: 'Armer',
    projectPostcode: 'TE12ST'
  },
  gridReference: 'A1',
  confirmationId: '12345678',
  legalStatus: 'Sole trader',
  inEngland: 'Yes',
  systemType: 'Slurry-based system',
  existingStorageCapacity: 'Less than 6 months',
  plannedStorageCapacity: '6 months',
  storageType: 'Above- ground steel slurry store',
  planningPermission: 'Yes',
  projectStart: 'Yes, preparatory work',
  serviceCapacityIncrease: '',
  tenancy: 'Yes',
  isTenancyLength: 'Yes',
  remainingCost: 'Yes',
  businessDetails: {
    projectName: 'Test Project',
    businessName: 'Test Business'
  },
  projectType: '',
  applicantBusiness: ''
}

module.exports = agentSubmissionForFarmer
