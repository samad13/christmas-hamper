const express = require('express');
const router = express.Router();
const registerController = require('../controller/register');

// Route for creating a new agency
router.post('/register', registerController.createRegistration);

module.exports = router;



