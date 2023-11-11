const mongoose = require("mongoose");

const inProduction = process.env.NOD_ENV === "production";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: inProduction ? false : true, // This will prevent building of all schemas immediately app is loaded in production. Bad for performance.
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
