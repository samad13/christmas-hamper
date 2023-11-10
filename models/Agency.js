const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
    {
        referrersName: {
            type: String,
            required: [true, "please provide referrer's name"],
        },
        referringOrganisation: {
            type: String,
            required: [true, "please provide referrering organiztion name"],
        },
        email: {
            type: String,
            required: [true, "please provide your email"],
        },
        referrerContactNumber: {
            type: Number,
            required: [true, "please provide referrer contact number"],
        }
    }


);


const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;


