const request = require('request');

module.exports = {
    /**
    * Handle GET static content delivery.
    * @param {String} appHost
    * @param {String} appPort
    * @param {String} req
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