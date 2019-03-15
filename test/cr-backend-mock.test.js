/**
 * CentralRouter backend test mockup.
 */
const io = require('socket.io')();
const ss = require('socket.io-stream');
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

app.get('/testroute', (req, res) => {
    console.log('[GET_QUERY] /testroute');
    
    res.send('Testroute is working.');
});

app.get('/teststatic/testfile.txt', (req, res) => {
    console.log('[GET_STATIC] /teststatic/testfile.txt');

    res.sendFile(__dirname + '/mockdata/testfile.txt');
});

io.on('connection', (socket) => {
    // Send the hello-handshake to the connected client.
    socket.emit('wss.interfaces.hello', '[HELLO] Connection was permitted.');

    socket.on('test.get_query.route', () => {
        // Test: send GET query to the client.
        io.emit('interfaces.http.get', '/testroute');
    });

    socket.on('test.get_query.static', () => {
        // Test: send GET static file query to the client.
        io.emit('interfaces.http.get', '/teststatic/testfile.txt');
    });

    socket.on('interfaces.http.response.query', (response) => {
        console.log(`[TEST_QUERY] status_code: ${response.statusCode} response: ${response.bodyData}`);
    });

    ss(socket).on('interfaces.http.response.static', (stream) => {
        console.log(`[TEST_STATIC] Response file was sent back.`);
    });
    
});

app.listen(8080);
io.listen(3000);