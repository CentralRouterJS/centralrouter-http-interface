/**
 * CentralRouter backend test mockup.
 */
const io = require('socket.io')();

io.on('connection', (socket) => { 
    // Send the hello-handshake to the connected client.
    socket.emit('wss.interfaces.hello', '[HELLO] Connection was permitted.');

    // Test: send GET query to the client.
    io.emit('interfaces.http.get', '/testroute');

    // Test: send GET static file query to the client.
    io.emit('interfaces.http.get', '/teststatic/testfile.txt');
});

io.listen(3000);