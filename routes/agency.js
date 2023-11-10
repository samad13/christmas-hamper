const express = require('express');
const router = express.Router();
const agencyController = require('../controller/agency');

// Route for creating a new agency
router.post('/agencies', agencyController.createAgency);
router.get('/agencies/:id', agencyController.getAgencyById);

module.exports = router;
