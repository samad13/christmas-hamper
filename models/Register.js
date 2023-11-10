const agencySchema = require("../models/Agency");

const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "please provide firstname"],
    },
    surname: {
        type: String,
        required: [true, "please provide surname"],
    },
    contactNumber: {
        type: Number,
        required: [true, "please provide your contact number"],
    },
    address: {
        type: String,
        required: [true, "please provide address"],
    },
    postcode: {
        type: String,
        required: [true, "please provide postcode"],
    },
    benefit: {
        type: String,
        enum: ["Yes", "No", "No recourse"],
        required: [true, "please click any of the box"],
    },
    ifYes: {
        type: String,
        enum: ["Yes", "No", "No recourse"],
        required: [true, "please fill the information"],
    },
    houseDemographic: {
        type: String,
        required: [true, "please provide house demographic"],
    },
    ethnicity: {
        type: String,
        required: [true, "please provide your ethnicity"],
    },
    Age: {
        type: String,
        enum: ["18 - 24", "25 - 34", "35 - 44", "45 - 54", "55 - 64", "over 65"],
        required: [true, "please pick your age bracket"],
    },
    // Add the agency field that references the external Agency schema
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency"
    },
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
