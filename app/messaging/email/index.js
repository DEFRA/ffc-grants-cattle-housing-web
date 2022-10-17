const cacheConfig = require('./config/cache')
let desirabilityScoreCache

module.exports = {
    initialise: (server) => {
        desirabilityScoreCache = server.cache({ //NOSONAR
            expiresIn: cacheConfig.desirabilityScoresSegment.expiresIn,
            segment: cacheConfig.desirabilityScoresSegment.name
        })
    },
    setDesirabilityScore: (key, value) => desirabilityScoreCache.set(key, value), //NOSONAR
    getDesirabilityScore: key => desirabilityScoreCache.get(key), //NOSONAR
    removeDesirabilityScore: key => {
        try { //NOSONAR
            if (desirabilityScoreCache.get(key)) desirabilityScoreCache.drop(key) //NOSONAR
        } catch (e) {
            console.log(e, 'key not found.') //NOSONAR
        }
    }
}
