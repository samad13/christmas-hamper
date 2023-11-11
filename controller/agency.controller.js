const Agency = require("../models/agency.model");

// @desc    register an agency
// @route   POST /api/agency
// @access  Public

const createAgency = async (req, res) => {
  const { name, organisation, email, contact } = req.body;

  // Add validation

  const agency = await Agency.create({
    name,
    organisation,
    email,
    contact,
  });

  res.status(201).json({
    message: "Agency created successfully",
    agency: agency,
  });
};

const getAgencyById = async (req, res) => {
  const agency = await Agency.findById(req.params.id);

  if (!agency) {
    res.status(404).json("agency Not Found");
  }

  res.status(200).json(agency);
};

module.exports = {
  createAgency,
  getAgencyById,
};
