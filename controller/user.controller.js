const User = require("../models/user.model");
const Agency = require("../models/agency.model");

const Joi = require("joi");
const mongoose = require("mongoose");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const creds = require("../client_seceret.json");

const createUser = async (req, res) => {
  const validatePayload = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      contactNumber: Joi.string().required(),
      address: Joi.string().required(),
      postcode: Joi.string().required(),
      benefit: Joi.boolean().required(),
      available: Joi.boolean(),
      consent: Joi.boolean(),
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

  let agency;
  if (value.agencyId) {
    if (!mongoose.Types.ObjectId.isValid(value.agencyId))
      return res.status(400).json({ message: "Invalid Agency Id" });

    agency = await Agency.findById(value.agencyId);

    if (!agency) return res.status(404).json({ message: "Agency not found" });
  }

  const spreadSheetId = process.env.SPREADSHEET_ID;
  const doc = new GoogleSpreadsheet(spreadSheetId);

  try {
    await doc.useServiceAccountAuth(creds);
    await doc.getInfo();
    const sheet = doc.sheetsByTitle["single-filtered"];
    await sheet.addRow({
      firstName: value.firstName,
      lastName: value.lastName,
      email: value.email,
      contactNumber: value.contactNumber,
      address: value.address,
      postcode: value.postcode,
      benefit: value.benefit ? "YES" : "NO",
      available: value.available ? "YES" : "NO",
      consent: !value.agencyId ? " " : value.consent ? "YES" : "NO",
      benefits: value.benefits.join(","),
      houseDemography: value.houseDemography,
      ethnicity: value.ethnicity,
      age: value.age,
      agency: agency?.name,
      timeOfCollection: value.timeOfCollection,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
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

const getAllUser = async (req, res) => {
  const users = await User.find().populate("agency");

  //   let num;
  //   let email;
  // const rows = users
  //   .map((user) => {
  //     if (num === user.contactNumber) return null;
  //     if(email?.toLowerCase() == user.email?.toLowerCase()) return null;
  //     num = user.contactNumber;
  //     email = user.email
  //     console.log(user.email);
  //     return {
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //       email: user.email,
  //       contactNumber: user.contactNumber,
  //       address: user.address,
  //       postcode: user.postcode,
  //       benefit: user.benefit ? "YES" : "NO",
  //       available: user.available ? "YES" : "NO",
  //       consent: !user.agencyId ? " " : user.benefit ? "YES" : "NO",
  //       benefits: user.benefits.join(","),
  //       houseDemography: user.houseDemography,
  //       ethnicity: user.ethnicity,
  //       age: user.age,
  //       agency: user.agency?.name,
  //       timeOfCollection: user.timeOfCollection,
  //     };
  //   })
  //   .filter((item) => item !== null);

  // const uniqueContacts = new Set();
  // const uniqueEmails = new Set();
  // const rows = users
  //   .filter((user) => {
  //     const lowercaseEmail = user.email?.toLowerCase();
  //     if (
  //       !lowercaseEmail ||
  //       uniqueEmails.has(lowercaseEmail) ||
  //       uniqueContacts.has(user.contactNumber)
  //     ) {
  //       return false; // Skip if email is empty, email already encountered, or contact number already encountered
  //     }
  //     uniqueEmails.add(lowercaseEmail);
  //     uniqueContacts.add(user.contactNumber);
  //     return true;
  //   })
  //   .map((user) => ({
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     contactNumber: user.contactNumber,
  //     address: user.address,
  //     postcode: user.postcode,
  //     benefit: user.benefit ? "YES" : "NO",
  //     available: user.available ? "YES" : "NO",
  //     consent: !user.agency ? "" : user.consent ? "YES" : "NO",
  //     benefits: user.benefits.join(","),
  //     houseDemography: user.houseDemography,
  //     ethnicity: user.ethnicity,
  //     age: user.age,
  //     agency: user.agency?.name,
  //     timeOfCollection: user.timeOfCollection,
  //   }));

  // const spreadSheetId = process.env.SPREADSHEET_ID;
  // const doc = new GoogleSpreadsheet(spreadSheetId);

  // try {
  //   await doc.useServiceAccountAuth(creds);
  //   await doc.getInfo();
  //   const sheet = doc.sheetsByTitle["single-filtered"];
  //   await sheet.addRows(rows);
  // } catch (error) {
  //   return res.status(500).json({ error: error.message });
  // }

  res.status(200).json({
    users,
  });
};

module.exports = {
  createUser,
  getAllUser,
};
