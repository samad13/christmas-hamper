const mongoose = require("mongoose");

const agencySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please provide referrer's name"],
        },
        organisation: {
            type: String,
            required: [true, "please provide referrering organiztion name"],
        },
        email: {
            type: String,
            required: [true, "please provide your email"],
        },
        contact: {
            type: Number,
            required: [true, "please provide referrer contact number"],
        }
    }


);


const Agency = mongoose.model("Agency", agencySchema);

module.exports = Agency;


