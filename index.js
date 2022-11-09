// Add express
const express = require('express');
// Add cors
const cors = require('cors');
// Require dotenv & call config
require('dotenv').config();

// Initialize express
const app = express();
// Add port
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());




// get request
app.get('/', (req, res) => {
    res.send("Foodie server is running");
});

// Initialize port
app.listen(port, () => {
    console.log(`Foodie server running on ${port}`);
})