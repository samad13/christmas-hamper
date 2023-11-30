const Agency = require("../models/agency.model");

// @desc    register an agency
// @route   POST /api/agency
// @access  Public

const createAgency = async (req, res) => {
  const validatePayload = (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      organisation: Joi.string().required(),
      email: Joi.string().required(),
      contact: Joi.string().required(),
    });

    return schema.validate(data);
  };

  const { error, value } = validatePayload(req.body);
  if (error) return res.status(400).json({ message: error.message });

  const agency = await Agency.create(...value);

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
