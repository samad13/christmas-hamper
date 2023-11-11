const mongoose = require("mongoose");

const recipientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "please provide First Name"],
    },
    lastName: {
        type: String,
        required: [true, "please provide last Name"],
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
        enum: ["yes", "no", "no_recourse"],
        required: [true, "please click any of the box"],
    },
    ifYes: {
        type: String,
        required: [true, "please fill the information"],
    },
    houseDemography: {
        type: String,
        required: [true, "please provide house demographic"],
    },
    ethnicity: {
        type: String,
        required: [true, "please provide your ethnicity"],
    },
    age: {
        type: String,
        enum: ["18_24", "25_34", "35_44", "45_54", "55_64", "over_65"],
        required: [true, "please pick your age bracket"],
    },
    // Add the agency field that references the external Agency schema
    agency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Agency"
    },
});

const Recipient = mongoose.model("Recipient", recipientSchema);

module.exports = Recipient;
