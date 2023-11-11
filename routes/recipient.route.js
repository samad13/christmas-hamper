const express = require('express');
const router = express.Router();
const recipientController = require('../controller/recipient.controller');

// Route for creating a new agency
router.post('/', recipientController.createRecipient);

module.exports = router;



