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
    },

    /**
     * Handle POST query to the local endpoint.
     * @param appHost
     * @param appPort
     * @param postdata
     * 
     * @returns {Object}
     */
    passPostRequest: (appHost, appPort, postdata) => {
        const httpRoute = postdata.route;
        const httpData = postdata.data;

        console.log(`[POST] ${httpData}`);

        request.post({
            url: `http://${appHost}:${appPort}${httpRoute}`,
            form: { httpData }
        }, (error, response, body) => {
            if (error) throw error;

            let retObj = {
                statusCode: response.statusCode,
                bodyData: body
            };

            return retObj;
        });
    }
}