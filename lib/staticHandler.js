const request = require('request');

module.exports = {
    /**
    * Handle GET static content delivery.
    * @param {String} appHost
    * @param {String} appPort
    * @param {String} req
    */
    passGetRequest: (appHost, appPort, req) => {
        console.log(`[GET_STATIC] ${req}`);

        request
            .get(`http://${appHost}:${appPort}${req}`)
            .on('error', (err) => {
                console.log(err);
            })
            .pipe(fs.createWriteStream(`${req}`));
    }
}