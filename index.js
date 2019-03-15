const dotenv = require('dotenv').config();
const request = require('request');
const staticHandler = require('./lib/staticHandler');
const queryHandler = require('./lib/queryHandler');
const extensionHandler = require('./lib/extensionHandler');

// APP-wide variables specified in Dotenv (with fallback values).
const appHost = process.env.LOCAL_APP_HOST || "localhost";
const appPort = process.env.LOCAL_APP_PORT || 80;
const wssHost = process.env.CENTRAL_WSS_HOST || "localhost";
const wssPort = process.env.CENTRAL_WSS_PORT || 8081;

const socket = require('socket.io-client')(`http://${wssHost}:${wssPort}`);

// Connect to the remote CentralRouter instance.
socket.on('connect', () => {
    console.log(`Connected to CentralRouter instance ${appHost}.`);
});

// Wait for the hello-handshake from the server.
socket.on('wss.interfaces.hello', (data) => {
    console.log(data);
});

// Listen for the GET requests sent to the local hidden network.
socket.on('interfaces.http.get', (httpdata) => {

    // Check if req contains an extension.
    // If so, then handle the request with the static handler.
    // Else with the query handler.
    extensionHandler.check(httpdata, (routeWithExtension) => {
        if (routeWithExtension) {
            // Wait for response from the static handler.
            staticHandler.passGetRequest(appHost, appPort, httpdata, (fileName) => {
                if (fileName) {
                    // Pass the response back to WSS.
                    ss(socket).emit('interfaces.http.response.static', stream, ({ fileName: fileName }));
                    fs.createReadStream(__dirname + '/../public/' + fileName).pipe(stream);
                }
            });
        } else {
            // Wait for response from the query handler.
            queryHandler.passGetRequest(appHost, appPort, httpdata, (responseData) => {
                if (responseData) {
                    // Pass the response back to WSS.
                    socket.emit('interfaces.http.response', {
                        statusCode: responseData.statusCode,
                        bodyData: responseData.body
                    });
                }
            });
        }
    });
});

// Listen for the POST requests sent to the local hidden network.
socket.on('interfaces.http.post', (postdata) => {
    const httpRoute = postdata.route;
    const httpData = postdata.data;

    console.log(`[POST] ${httpData}`);

    request.post({
        url: `http://${appHost}:${appPort}${httpRoute}`,
        form: { httpData }
    }, (error, response, body) => {
        if (error) throw error;

        socket.emit('interfaces.http.response', {
            statusCode: response.statusCode,
            bodyData: body
        });
    });
});

// Disconnect handler for the WSS.
socket.on('disconnect', () => {
    console.log('Disconnected from CentralRouter instance.');
});
