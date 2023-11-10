const Register = require("../models/Register");
const Agency = require("../models/Agency");

const createRegistration = async (req, res) => {
    const {
        firstname,
        surname,
        contactNumber,
        address,
        postcode,
        benefit,
        ifYes,
        houseDemographic,
        ethnicity,
        Age,
        agencyId,
    } = req.body;

    try {
        if (!agencyId) {
            // If registering without an agency
            const registration = await Register.create({
                firstname,
                surname,
                contactNumber,
                address,
                postcode,
                benefit,
                ifYes,
                houseDemographic,
                ethnicity,
                Age,
            });

            return res.status(201).json({
                message: "Registration created successfully without an agency",
                registrationId: registration._id,
            });
        }

        // If registering with an agency
        const isAgencyExists = await Agency.exists({ _id: agencyId });

        if (isAgencyExists) {
            const registration = await Register.create({
                firstname,
                surname,
                contactNumber,
                address,
                postcode,
                benefit,
                ifYes,
                houseDemographic,
                ethnicity,
                Age,
                agency: agencyId,
            });

            return res.status(201).json({
                message: "Registration created successfully with an agency",
                registrationId: registration._id,
            });
        }

        return res.status(400).json({ error: "Invalid agencyId. Registration failed." });
    } catch (error) {
        console.error("Error in createRegistration:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



module.exports = {
    createRegistration
};