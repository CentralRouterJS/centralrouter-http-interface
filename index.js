const dotenv = require('dotenv').config();
const request = require('request');
const staticHandler = require('./lib/staticHandler');
const queryHandler = require('./lib/queryHandler');

// APP-wide variables specified in Dotenv (with fallback values).
const appHost = process.env.LOCAL_APP_HOST      || "localhost";
const appPort = process.env.LOCAL_APP_PORT      || 80;
const wssHost = process.env.CENTRAL_WSS_HOST    || "localhost";
const wssPort = process.env.CENTRAL_WSS_PORT    || 8081;

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
    console.log(`[GET] ${httpdata}`); 

    request(`http://${appHost}:${appPort}${httpdata}`, (error, response, body) => {
        if(error) throw error;
        
        socket.emit('interfaces.http.response', {
            statusCode: response.statusCode,
            bodyData: body
        });
    });
});

// Listen for the POST requests sent to the local hidden network.
socket.on('interfaces.http.post', (postdata) => {
    const httpRoute = postdata.route;
    const httpData  = postdata.data;

    console.log(`[POST] ${httpData}`); 

    request.post({ 
        url: `http://${appHost}:${appPort}${httpRoute}`, 
        form: {httpData}}, (error, response, body) => {
            if(error) throw error;

            
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
