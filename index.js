const dotenv = require('dotenv');
const request = require('request');

const appHost = process.env.LOCAL_APP_HOST      || "localhost";
const appPort = process.env.LOCAL_APP_PORT      || 8080;
const wssHost = process.env.CENTRAL_WSS_HOST    || "localhost";
const wssPort = process.env.CENTRAL_WSS_PORT    || 1337;

request(`http://${appHost}:${appPort}`, (err, res, body) => {
    if(err) throw err;

    console.log(body);
});