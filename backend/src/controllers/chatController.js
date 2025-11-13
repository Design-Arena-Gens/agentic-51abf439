const { getChatResponse } = require('../services/chatService');

const askChatbot = (req, res) => {
  const { message } = req.body;
  const response = getChatResponse(message);
  res.json({ response });
};

module.exports = {
  askChatbot,
};

