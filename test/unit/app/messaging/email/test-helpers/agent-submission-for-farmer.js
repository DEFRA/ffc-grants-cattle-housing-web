const agentSubmissionForFarmer = {
  applying: 'Agent',
  consentOptional: false,
  otherItems: 'None of the above',
  agentDetails: {
    title: "Mr",
    firstName: "Geoff",
    lastName: "Hopkin",
    businessName: "My Farm Business",
    emailAddress: "me@me.com",
    landline: "",
    mobile: "08765 443322",
    address1: "88 The Street",
    address2: "",
    town: "Newcastle",
    county: "Tyne And Wear",
    postcode: "AB12 7YY"
  },
  farmerDetails: {
    title: "Mrs",
    firstName: "Mary",
    lastName: "Jones",
    emailAddress: "test@test.com",
    landline: "01888 123665",
    mobile: "08870 554024",
    address1: "123 Road",
    address2: "Fulford",
    town: "York",
    county: "North Yorkshire",
    postcode: "YO33 4FF"
  },
  confirmationId: '12345678',
  legalStatus: 'Sole trader',
  inEngland: 'Yes',
  systemType: 'Slurry-based system',
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
  applicantBusiness: '',
  project:'Building new calf housing',
  calfWeight:'100kg or under',
  livingSpace:'Yes',
  housedIndividually:'No',
  isolateCalves:'Yes',
  strawBedding:'Yes',
  concreteFlooring:'Yes',
  enrichment:'Yes',
  structure:'A-frame building',
  drainageSlope:'Yes',
  additionalItems:'Yes',
  lighting:'Yes',
  roofSolarPV:'Yes',
  projectCost: 100000,
  potentialFunding: "40000.00",
  remainingCost: "60000.00",
  housing:'Yes',
  calfGroupSize:'2 to 3',
  automaticCalfFeeder:'5 to 8',
  moistureControl:['A drain or drainage channel inside the pen', 'Positioning drinking areas near drainage and away from bedding'],
  permanentSickPen:['A permanent sick pen', 'A separate air space'],
  floorSpace:20,
  environmentalImpact:['Solar PV panels on the roof of the building', 'Collect and store rainwater'],
  sustainableMaterials:['Low carbon concrete', 'Steel replacement products'],
  introducingInnovation:['Technology', 'Collaboration']
}

module.exports = agentSubmissionForFarmer
