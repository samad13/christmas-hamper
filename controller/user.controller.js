const User = require("../models/user.model");
const Agency = require("../models/agency.model");

const Joi = require("joi");
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  const validatePayload = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      contactNumber: Joi.string().required(),
      address: Joi.string().required(),
      postcode: Joi.string().required(),
      benefit: Joi.boolean().required(),
      benefits: Joi.array().items(Joi.string()),
      houseDemography: Joi.string().required(),
      ethnicity: Joi.string().required(),
      agencyId: Joi.string(),
      age: Joi.string().required(),
      timeOfCollection: Joi.string().required(),
    });

    return schema.validate(data);
  };

  const { error, value } = validatePayload(req.body);
  if (error) return res.status(400).json({ message: error.message });

  if (value.agencyId) {
    if (!mongoose.Types.ObjectId.isValid(value.agencyId))
      return res.status(400).json({ message: "Invalid Agency Id" });

    const isAgencyExists = await Agency.exists({ _id: value.agencyId });

    if (!isAgencyExists)
      return res.status(404).json({ message: "Agency not found" });
  }

  const user = new User({ ...value, agency: value.agencyId });

  try {
    await user.save();
  } catch (error) {
    console.error("Error in createRegistration:", error);
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json({
    message: "Registration successful",
    user: user,
  });
};

module.exports = {
  createUser,
};
