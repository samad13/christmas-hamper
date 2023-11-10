const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const agencyRoutes = require('./routes/agency');

dotenv.config();





app.get("/", (req, res) => {

    res.status(200).send("Box of Hope");
});


mongoose.connect(process.env.MONGO_URI,)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });

// agency routes
app.use('/api', agencyRoutes);


const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT}`
    )
);