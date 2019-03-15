/**
 * HTTP-interface mockup test file.
 * In order to get successful results, 
 * please first run the cr-backend mockup server.
 */
const socket = require('socket.io-client')(`http://localhost:3000`);
const ss = require('socket.io-stream');
const stream = ss.createStream();
const fs = require('fs');
const queryHandler = require('../lib/queryHandler');
const staticHandler = require('../lib/staticHandler');
const extensionHandler = require('../lib/extensionHandler');

describe('Hello-handshake', () => {
    it('Should get Hello-handshake', (done) => {
        socket.on('wss.interfaces.hello', (data) => {
            done();
        });
    });
});

describe('Route query', () => {
    it('Should get route query GET request', (done) => {
        socket.emit('test.get_query.route', '');

        socket.on('interfaces.http.get', (httpdata) => {
            let httpExtensionData = httpdata;

            extensionHandler.check(httpExtensionData, (cb) => {
                if (!cb) {
                    queryHandler.passGetRequest('localhost', '8080', '/testroute', (responseData) => {
                        if (responseData) {
                            socket.emit('interfaces.http.response.query', {
                                statusCode: responseData.statusCode,
                                bodyData: responseData.bodyData
                            });
    
                            done();
                        }
                    });
                }
            });
        });
    });
});

describe('Static-file query', () => {
    it('Should get static-file query GET request', (done) => {
        socket.emit('test.get_query.static', '');

        socket.on('interfaces.http.get', (httpdata) => {
            let httpExtensionData = httpdata;

            extensionHandler.check(httpExtensionData, (cb) => {
                if (!cb) {
                    staticHandler.passGetRequest('localhost', '8080', httpdata, (fileName) => {
                        if (fileName) {
                            ss(socket).emit('interfaces.http.response.static', stream, ({ fileName: fileName }));
                            fs.createReadStream(__dirname + '/../test/mockdata/' + fileName).pipe(stream);

                            done();
                        }
                    });
                }
            });
        });
    });
});