const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Route for creating a new agency
router.post('/', userController.createUser);

module.exports = router;



