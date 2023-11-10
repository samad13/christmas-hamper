const agency = require('../models/Agency');

// @desc    register an agency
// @route   POST /api/agency
// @access  Public

const createAgency = (async (req, res) => {
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
});







module.exports = {
    createAgency
};