
const msgData = {
  grantScheme: {
    key: 'Calf01',
    name: 'Cattle Housing Grant'
  },
  desirability: {
    questions: [
      {
        key: "housing",
        answers: [
          {
            key: 'housing',
            title: 'Housing',
            input: [
              {
                key: 'housing-A1',
                value: 'Yes'
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "calf-group-size",
        answers: [
          {
            key: 'calf-group-size',
            title: 'Calf group size',
            input: [
              {
                key: 'calf-group-size-A1',
                value: '2 to 3'
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "number-of-calves",
        answers: [
          {
            key: 'number-of-calves',
            title: 'CNumber of calves',
            input: [
              {
                key: 'number-of-calves-A1',
                value: '2 to 50'
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "automatic-calf-feeder",
        answers: [
          {
            key: 'automatic-calf-feeder',
            title: 'Automatic Calf Feeder',
            input: [
              {
                key: 'automatic-calf-feeder-A1',
                value: '1 to 4'
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "calf-group-size",
        answers: [
          {
            key: 'calf-group-size',
            title: 'Calf group size',
            input: [
              {
                key: 'calf-group-size-A1',
                value: '2 to 3'
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "moisture-control",
        answers: [
          {
            key: 'moisture-control',
            title: 'Moisture control',
            input: [
              {
                key: 'moisture-control-A1',
                value: 'A drain or drainage channel inside the pen'
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "permanent-sick-pen",
        answers: [
          {
            key: 'permanent-sick-pen',
            title: 'Permanent sick pen',
            input: [
              {
                key: 'permanent-sick-pen-A1',
                value: 'A permanent sick pen'
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "floor-space",
        answers: [
          {
            key: 'floor-space',
            title: 'Floor space',
            input: [
              {
                key: null,
                value: 20
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: "floor-space",
        answers: [
          {
            key: 'floor-space',
            title: 'Floor space',
            input: [
              {
                key: null,
                value: 20
              }
            ]
          }
        ],
        rating: {
          score: 6,
          band: 'Average'
        }
        
      },
      {
        key: 'environmental-impact',
        answers: [
          {
            key: 'environmental-impact',
            title: 'How will the project improve the environment?',
            input: [
              {
                key: 'environmental-impact-A1',
                value: 'Solar PV panels on the roof of the building'
              },
              {
                key: 'environmental-impact-A2',
                value: 'Collect and store rainwater'
              }
            ]
          }
        ],
        rating: {
          score: 0.8,
          band: 'Strong'
        }
      },
      {
        key: 'sustainable-materials',
        answers: [
          {
            key: 'sustainable-materials',
            title: 'Sustainable materials',
            input: [
              {
                key: 'sustainable-materials-A1',
                value: 'Low carbon concrete'
              },
              {
                key: 'sustainable-materials-A2',
                value: 'Steel replacement products'
              }
            ]
          }
        ],
        rating: {
          score: 0.8,
          band: 'Strong'
        }
      }
    ],
      
    overallRating: {
      score: 19,
      band: 'Average'
    }
  }
}
module.exports = msgData
