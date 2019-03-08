const request = require('request');

module.exports = {
    /**
     * Handle GET query to the local endpoint.
     * @param appHost
     * @param appPort
     * @param req
     * 
     * @returns {Object}
     */
    passGetRequest: (appHost, appPort, req) => {
        console.log(`[GET] ${req}`);

        request(`http://${appHost}:${appPort}${req}`, (error, response, body) => {
            if (error) throw error;

            let retObj = {
                statusCode: response.statusCode,
                bodyData: body
            };

            return retObj;
        });
    }
}