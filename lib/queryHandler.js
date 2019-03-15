const request = require('request');

module.exports = {
    /**
     * Handle GET query to the local endpoint.
     * @param {String} appHost
     * @param {String} appPort
     * @param {String} req
     * 
     * @returns {Object} retObj
     */
    passGetRequest: (appHost, appPort, req, callback) => {
        console.log(`[GET_QUERY] ${req}`);

        request(`http://${appHost}:${appPort}${req}`, (error, response, body) => {
            if (error) throw error;

            let retObj = {
                statusCode: response.statusCode,
                bodyData: body
            };

            callback(retObj);
        });
    },

    /**
     * Handle POST query to the local endpoint.
     * @param {String} appHost
     * @param {String} appPort
     * @param {String} postdata
     * 
     * @returns {Object} retObj
     */
    passPostRequest: (appHost, appPort, postdata) => {
        const httpRoute = postdata.route;
        const httpData = postdata.data;

        console.log(`[POST_QUERY] ${httpData}`);

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