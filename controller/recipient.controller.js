const Recipient = require("../models/recipient.model");
const Agency = require("../models/agency.model");

const createRecipient = async (req, res) => {
  const {
    firstName,
    lastName,
    contactNumber,
    address,
    postcode,
    benefit,
    ifYes,
    houseDemography,
    ethnicity,
    age,
    agencyId,
  } = req.body;

  // Validate using JOI

  // Validate all enums are provided correctly, else, throw a bad request error.

  // If there is agencyId, ensure it is a mongoose Id.

  if (agencyId) {
    const isAgencyExists = await Agency.exists({ _id: agencyId });

    if (!isAgencyExists)
      return res.status(404).json({ message: "Agency not found" });
  }

  const recipient = new Recipient({
    firstName,
    lastName,
    contactNumber,
    address,
    postcode,
    benefit,
    ifYes,
    houseDemography,
    ethnicity,
    age,
    agency: agencyId,
  });

  try {
    await recipient.save();
  } catch (error) {
    console.error("Error in createRegistration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }

  res.status(201).json({
    message: "Registration created successfully without an agency",
    recipient: recipient,
  });
};

module.exports = {
  createRecipient,
};
