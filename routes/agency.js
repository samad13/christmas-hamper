const express = require('express');
const router = express.Router();
const agencyController = require('../controller/agency');

// Route for creating a new agency
router.post('/agencies', agencyController.createAgency);

module.exports = router;
