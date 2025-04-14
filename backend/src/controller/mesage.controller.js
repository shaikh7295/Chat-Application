const Message = require('../model/messageHistoryModel');

exports.saveMessageFromSocket = async (data) => {
  const { message , receiverId , senderId  } = data;
  const messages = new Message({
    senderId,
    receiverId,
    message,
    status: 'sent',
  });
  return await messages.save();
};

exports.markAsDelivered = async (messageId) => {
  await Message.findByIdAndUpdate(messageId, { status: 'delivered' });
};

exports.markAsRead = async (messageId) => {
  await Message.findByIdAndUpdate(messageId, { status: 'read' });
};

exports.getMessagesBetweenUsers = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};


