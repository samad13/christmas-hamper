const express = require("express");
const router = express.Router();
const agencyController = require("../controller/agency.controller");

// Route for creating a new agency
router.post("/", agencyController.createAgency);
router.get("/:id", agencyController.getAgencyById);

module.exports = router;
