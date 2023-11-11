const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const agencyRoutes = require("./routes/agency.route");
const recipientRoutes = require("./routes/recipient.route");
const connectDB = require("./utils/dbConnect");

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(compression());

app.get("/", (req, res) => {
  res.status(200).send("Box of Hope");
});

// agency routes
app.use("/api/agencies", agencyRoutes);
app.use("/api/recipients", recipientRoutes);

//connect to server
mongoose.connection.once("open", () => {
  console.log("Connected to DB");
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
