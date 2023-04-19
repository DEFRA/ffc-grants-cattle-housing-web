
const msgData = {
  "grantScheme": {
      "key": "CALF01",
      "name": "Upgrading Calf Housing"
  },
  "desirability": {
      "questions": [
          {
              "key": "housing",
              "answers": [
                  {
                      "key": "housing",
                      "title": "Are you moving from individually housing calves over 7 days old to pair or group housing?",
                      "input": [
                          {
                              "key": "housing-A1",
                              "value": "Yes"
                          }
                      ]
                  }
              ],
              "rating": {
                  "score": 14.76,
                  "band": "Strong",
                  "importance": null
              }
          },
          {
              "key": "calf-group-size",
              "answers": [
                  {
                      "key": "calf-group-size",
                      "title": "What will be the average group size for calves over 7 days old?",
                      "input": [
                          {
                              "key": "calf-group-size-A1",
                              "value": "2 to 3"
                          }
                      ]
                  }
              ],
              "rating": {
                  "score": 2.9469,
                  "band": "Strong",
                  "importance": null
              }
          },
          {
              "key": "number-of-calves",
              "answers": [
                  {
                      "key": "number-of-calves",
                      "title": "What will be the maximum number of calves in the calf housing?",
                      "input": [
                          {
                              "key": "number-of-calves-A2",
                              "value": "51 to 100"
                          }
                      ]
                  }
              ],
              "rating": {
                  "score": 0,
                  "band": "Weak",
                  "importance": null
              }
          },
          {
              "key": "automatic-calf-feeder",
              "answers": [
                  {
                      "key": "automatic-calf-feeder",
                      "title": "How many calves will you have per automatic feeder?",
                      "input": [
                          {
                              "key": "automatic-calf-feeder-A3",
                              "value": "9 to 12"
                          }
                      ]
                  }
              ],
              "rating": {
                  "score": 0.7293000000000001,
                  "band": "Strong",
                  "importance": null
              }
          },
          {
              "key": "moisture-control",
              "answers": [
                  {
                      "key": "moisture-control",
                      "title": "How will your building control moisture?",
                      "input": [
                          {
                              "key": "moisture-control-A2",
                              "value": "Positioning drinking areas near drainage and away from bedding"
                          },
                          {
                              "key": "moisture-control-A3",
                              "value": "A separate preparation or washing area"
                          }
                      ]
                  }
              ],
              "rating": {}
          },
          {
              "key": "permanent-sick-pen",
              "answers": [
                  {
                      "key": "permanent-sick-pen",
                      "title": "What type of sick pen will your building have?",
                      "input": [
                          {
                              "key": "permanent-sick-pen-A1",
                              "value": "A permanent sick pen"
                          },
                          {
                              "key": "permanent-sick-pen-A2",
                              "value": "A separate air space"
                          }
                      ]
                  }
              ],
              "rating": {}
          },
          {
              "key": "floor-space",
              "answers": [
                  {
                      "key": "floor-space",
                      "title": "How much space will each calf have?",
                      "input": [
                          {
                              "key": 3,
                              "value": 5454
                          }
                      ]
                  }
              ],
              "rating": {
                  "score": 2725500,
                  "band": "Strong",
                  "importance": null
              }
          },
          {
              "key": "environmental-impact",
              "answers": [
                  {
                      "key": "environmental-impact",
                      "title": "How will the building minimise environmental impact?",
                      "input": [
                          {
                              "key": "environmental-impact-A2",
                              "value": "Collect and store rainwater"
                          }
                      ]
                  }
              ],
              "rating": {}
          },
          {
              "key": "sustainable-materials",
              "answers": [
                  {
                      "key": "sustainable-materials",
                      "title": "Will your building use sustainable materials?",
                      "input": [
                          {
                              "key": "sustainable-materials-A1",
                              "value": "Low carbon concrete"
                          }
                      ]
                  }
              ],
              "rating": {}
          },
          {
              "key": "introducing-innovation",
              "answers": [
                  {
                      "key": "introducing-innovation",
                      "title": "Is your project introducing innovation?",
                      "input": [
                          {
                              "key": "introducing-innovation-A1",
                              "value": "Technology"
                          },
                          {
                              "key": "introducing-innovation-A3",
                              "value": "Techniques"
                          }
                      ]
                  }
              ],
              "rating": {}
          }
      ],
      "overallRating": {
          "score": null,
          "band": "Average"
      }
  }
}
module.exports = msgData
