const express = require('express');
const { askChatbot } = require('../controllers/chatController');

const router = express.Router();

router.post('/', askChatbot);

module.exports = router;

