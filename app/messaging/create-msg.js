const { YAR_KEYS } = require('../config/question-bank')
const Joi = require('joi')
const { getDataFromYarValue } = require('./../helpers/pageHelpers')
const { getYarValue } = require('../helpers/session')

function getAllDetails (request, confirmationId) {
  return YAR_KEYS.reduce(
    (allDetails, key) => {
      allDetails[key] = getYarValue(request, key)
      return allDetails
    },
    { confirmationId }
  )
}

const desirabilityAnswersSchema = Joi.object({
  housing: Joi.string(),
  calfGroupSize: Joi.string(),
  moistureControl: Joi.array().items(Joi.string()),
  permanentSickPen: Joi.array().items(Joi.string()),
  floorSpace: Joi.number(),
  environmentalImpact: Joi.array().items(Joi.string()),
  sustainableMaterials: Joi.array().items(Joi.string()),
  introducingInnovation: Joi.array().items(Joi.string())
})

function getDesirabilityAnswers (request) {
  try {
    
    const val = {
      housing: getYarValue(request, 'housing'),
      calfGroupSize: getYarValue(request, 'calfGroupSize'),
      moistureControl: getDataFromYarValue(request, 'moistureControl', 'multi-answer'),
      permanentSickPen: getDataFromYarValue(request, 'permanentSickPen', 'multi-answer'),
      floorSpace: getYarValue(request, 'floorSpace'),
      environmentalImpact: getDataFromYarValue(request, 'environmentalImpact', 'multi-answer'),
      sustainableMaterials: getDataFromYarValue(request, 'sustainableMaterials', 'multi-answer'),
      introducingInnovation: getDataFromYarValue(request, 'introducingInnovation', 'multi-answer')
    }
    
    const result = desirabilityAnswersSchema.validate(val, {
      abortEarly: false
    })
    if (result.error) {
      throw new Error(`The scoring data is invalid. ${result.error.message}`)
    }
    return result.value
  } catch (ex) {
    console.log(ex, 'error')
    return null
  }
}

module.exports = {
  getDesirabilityAnswers,
  getAllDetails
}
