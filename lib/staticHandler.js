const fs = require('fs');
const request = require('request');
const randomString = require('./randomString');
const extensionHandler = require('../lib/extensionHandler');

module.exports = {
    /**
    * Handle GET static content delivery.
    * @param {String} appHost
    * @param {String} appPort
    * @param {String} req
    */
    passGetRequest: (appHost, appPort, req, callback) => {
        console.log(`[GET_STATIC] ${req}`);

        randomString.generate(32, (fileName) => {
            let stream = request
                .get(`http://${appHost}:${appPort}${req}`)
                .on('error', (err) => {
                    console.log(err);
                })
                .pipe(fs.createWriteStream(__dirname + '/../test/mockdata/' + fileName + extensionHandler.getExtension(req)));

            stream.on('finish', () => {
                let fileStreamName = fileName + extensionHandler.getExtension(req);
                
                callback(fileStreamName);
            });
        });
    }
}