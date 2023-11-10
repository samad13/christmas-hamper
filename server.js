const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const agencyRoutes = require('./routes/agency');
const registerRoutes = require('./routes/register');

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// agency routes
app.use('/api', agencyRoutes);
app.use('/api', registerRoutes);


const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running on port ${PORT}`
    )
);