const jwt = require('jsonwebtoken');
const messageController = require('../controller/mesage.controller');
const User = require('../model/usermodel');

const JWT_SECRET = 'your_secret_key';
const userSockets = new Map();

const socketHandler = (io) => {
  // io.use(async (socket, next) => {
  //   try {
  //     const token = socket.handshake.auth.token;
  //     if (!token) return next(new Error('Auth token missing'));

  //     const decoded = jwt.verify(token, JWT_SECRET);
  //     const user = await User.findById(decoded.id);
  //     if (!user) return next(new Error('User not found'));

  //     socket.user = user; // attach user to socket
  //     next();
  //   } catch (err) {
  //     next(new Error('Authentication failed'));
  //   }
  // });

  io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId;
  
    if (!userId) {
      socket.disconnect();
      return;
    }
  
    const user = await User.findById(userId);
    if (!user) {
      socket.disconnect();
      return;
    }
    const existingSockets = userSockets.get(userId) || new Set();

    // Check if this socket ID is already in the set
    if (existingSockets.has(socket.id)) {
      console.log(`User ${userId} already joined with this socket`);
      return;
    }

    // Add socket ID to the user's set
    existingSockets.add(socket.id);
    userSockets.set(userId, existingSockets);
  
    socket.join(userId);
  
    await User.findByIdAndUpdate(userId, { status: 'online' });
    io.emit('user:status', { userId, status: 'online' });
  
    console.log(`User Connected: ${user.username}`);
  
    socket.on('message:send', async (data) => {
      const savedMessage = await messageController.saveMessageFromSocket(data);
      io.to(data.receiverId).emit('message:receive', savedMessage);
    });
  
    socket.on('message:delivered', async (messageId) => {
      await messageController.markAsDelivered(messageId);
    });
  
    socket.on('message:read', async (messageId) => {
      await messageController.markAsRead(messageId);
    });
  
    socket.on('user:typing', (data) => {
      io.to(data.receiverId).emit('user:typing', { senderId: userId });
    });
    socket.on('user:stopTyping', ({ senderId, receiverId }) => {
      socket.to(receiverId).emit('user:stopTyping', { senderId });
    });
  
    socket.on('disconnect', async () => {
      console.log(`User Disconnected: ${user.username}`);
      await User.findByIdAndUpdate(userId, { status: 'offline' });
      io.emit('user:status', { userId, status: 'offline' });
    });
  });
  
};

module.exports = { socketHandler };
