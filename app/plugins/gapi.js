const Analytics = require('@defra/hapi-gapi/lib/analytics')
const gapiService = require('../services/gapi-service')

exports.plugin = {
  name: 'Gapi',
  /**
     * Initialise the hapi-gapi plugin & send default page view to google analytics.
     *
     * @param server the hapi server instance
     * @param options the hapi-gapi configuration settings
     */
  register: async (server, options) => {
    const analytics = new Analytics(options)

    server.decorate('request', 'ga', request => analytics.ga(request), { apply: true })

    server.ext('onPreResponse', async (request, h) => {
      try {
        const response = request.response
        const statusFamily = Math.floor(response.statusCode / 100)
        if (statusFamily === 2 && response.variety === 'view' && !gapiService.isBlockDefaultPageView(request.url)) {
          await request.ga.view(request, { name: gapiService.eventTypes.PAGEVIEW, params: { page_path: request.route.path, page_title: request.route.fingerprint} })
        }
        if (statusFamily === 5) {
          await request.ga.view({ name: gapiService.eventTypes.EXCEPTION, params: { page_path: request.route.path, page_title: request.route.fingerprint } })
        }
      } catch {
        // ignore any error
      }
      return h.continue
    })

    // server.ext('onPostStop', async () => {
    //   await analytics.shutdown()
    //   server.log(['hapi-gapi'], 'All buffered events sent to the Google Analytics Measurement Protocol API.')
    // })
  }
}
