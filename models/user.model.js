const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    type: Boolean,
    required: [true, "please click any of the box"],
  },
  consent: {
    type: Boolean,
  },
  available: {
    type: Boolean,
  },
  benefits: {
    type: [String],
    required: function () {
      return this.benefit;
    },
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
  timeOfCollection: {
    type: Date,
    required: [true, "Please provide time of collection"]
  },
  // Add the agency field that references the external Agency schema
  agency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agency",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
