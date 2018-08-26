const dotenv = require('dotenv');
const request = require('request');

const appHost = process.env.LOCAL_APP_HOST      || "localhost";
const appPort = process.env.LOCAL_APP_PORT      || 8080;
const wssHost = process.env.CENTRAL_WSS_HOST    || "localhost";
const wssPort = process.env.CENTRAL_WSS_PORT    || 8081;

const socket = require('socket.io-client')(`http://${wssHost}:${wssPort}`);
socket.on('connect', () => {
    console.log('Connected to CentralRouter instance.');
});

socket.on('wss.interfaces.hello', (data) => {
    console.log(data);
});

socket.on('interfaces.http.request', (httpdata) => {
    console.log(httpdata);

    request(`http://${appHost}:${appPort}${httpdata}`, (error, response, body) => {
        if(error) throw error;
         
        socket.emit('interfaces.http.response', {
            statusCode: response.statusCode,
            bodyData: body
        });
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from CentralRouter instance.');
});
