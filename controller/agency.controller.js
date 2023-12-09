const Agency = require("../models/agency.model");
const Joi = require("joi");

const { GoogleSpreadsheet } = require("google-spreadsheet");

const creds = require("../client_seceret.json");

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

  const spreadSheetId = process.env.SPREADSHEET_ID;
  const doc = new GoogleSpreadsheet(spreadSheetId);

  try {
    await doc.useServiceAccountAuth(creds);
    await doc.getInfo();
    const sheet = doc.sheetsByTitle["agencies"];
    await sheet.addRow({
      name: value.name,
      organisation: value.organisation,
      email: value.email,
      contact: value.contact,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  const agency = await Agency.create({ ...value });

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

const getAllAgencies = async (req, res) => {
  const agencies = await Agency.find();

  // let num;
  // const rows = agencies
  //   .map((agency) => {
  //     if (num === agency.name) return null;
  //     num = agency.contactNumber;
  //     return {
  //       name: agency.name,
  //       organisation: agency.organisation,
  //       email: agency.email,
  //       contact: agency.contact,
  //     };
  //   })
  //   .filter((item) => item !== null);

  //   const spreadSheetId = process.env.SPREADSHEET_ID;
  //   const doc = new GoogleSpreadsheet(spreadSheetId);
  
  //   try {
  //     await doc.useServiceAccountAuth(creds);
  //     await doc.getInfo();
  //     const sheet = doc.sheetsByTitle["agencies"];
  //     await sheet.addRows(rows);
  //   } catch (error) {
  //     return res.status(500).json({ error: error.message });
  //   }

  res.status(200).json({
    agencies,
  });
};

module.exports = {
  createAgency,
  getAgencyById,
  getAllAgencies
};
