/**
 * HTTP-interface mockup test file.
 * In order to get successful results, 
 * please first run the cr-backend mockup server.
 */
const socket = require('socket.io-client')(`http://localhost:3000`);
const queryHandler = require('../lib/queryHandler');
const extensionHandler = require('../lib/extensionHandler');

describe('Websocket', () => {
    it('Should get Hello-handshake:', (done) => {
        socket.on('wss.interfaces.hello', (data) => {
            done();
        });
    });

    it('Should get route query GET request:', (done) => {
        socket.on('interfaces.http.get', (httpdata) => {
            if ( !extensionHandler.check(httpdata) ) done();
        });
    });

    it('Should get static-file query GET request:', (done) => {
        socket.on('interfaces.http.get', (httpdata) => {
            if ( extensionHandler.check(httpdata) ) done();
        });
    });
});