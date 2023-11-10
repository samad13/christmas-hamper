const Agency = require('../models/Agency');

// @desc    register an agency
// @route   POST /api/agency
// @access  Public

const createAgency = async (req, res) => {
    const { referrersName, referringOrganisation, email, referrerContactNumber } =
        req.body;

    const agency = await Agency.create({
        referrersName,
        referringOrganisation,
        email,
        referrerContactNumber,
    });

    res.status(201).json({
        message: "Agency created successfully",
        agencyId: agency._id,
    })
};



const getAgencyById = async (req, res) => {
    const agency = await Agency.findById(req.params.id);
    if (!agency) {
        res.status(404).json('agency Not Found');
    }
    res.status(200).json(agency);
};




module.exports = {
    createAgency,
    getAgencyById
};