const request = require('request');

module.exports = {
    /**
    * Handle GET static content delivery.
    * @param appHost
    * @param appPort
    * @param req
    */
    passGetRequest: (appHost, appPort, req) => {
        request
            .get(`http://${appHost}:${appPort}${req}`)
            .on('error', (err) => {
                console.log(err);
            })
            .pipe(fs.createWriteStream(`${req}`));
    }
}