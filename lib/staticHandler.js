const request = require('request');

/**
 * Handle static content delivery.
 * @param req
 */
module.exports = {
    passRequest: (appHost, req) => {
        const requestQuery = 'http://' + appHost + req;

        request
            .get(`${requestQuery}`)
            .on('error', (err) => {
                console.log(err);
            })
            .pipe(fs.createWriteStream(`${req}`));
    }
}