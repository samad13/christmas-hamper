const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Route for creating a new agency
router.post('/', userController.createUser);
router.get('/', userController.getAllUser);

module.exports = router;



