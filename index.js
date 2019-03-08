const dotenv = require('dotenv').config();
const request = require('request');
const staticHandler = require('./lib/staticHandler');
const queryHandler = require('./lib/queryHandler');

const appHost = process.env.LOCAL_APP_HOST      || "localhost";
const appPort = process.env.LOCAL_APP_PORT      || 80;
const wssHost = process.env.CENTRAL_WSS_HOST    || "localhost";
const wssPort = process.env.CENTRAL_WSS_PORT    || 8081;

const socket = require('socket.io-client')(`http://${wssHost}:${wssPort}`);
socket.on('connect', () => {
    console.log(`Connected to CentralRouter instance ${appHost}.`);
});

socket.on('wss.interfaces.hello', (data) => {
    console.log(data);
});

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

socket.on('disconnect', () => {
    console.log('Disconnected from CentralRouter instance.');
});
