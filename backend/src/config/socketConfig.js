const { Server } = require('socket.io');
const { socketHandler } = require('../socket/socketHandler');

const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",  
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);
        socketHandler(io, socket);
    });
    io.on('error', (socket) => {
        console.log('error had Occur:', socket.id);
         
    });
    return io
};

module.exports = { configureSocket };
