// Add express
const express = require('express');
// Add cors
const cors = require('cors');
// Add mongodb
const { MongoClient, ServerApiVersion } = require('mongodb');
// Require dotenv & call config
require('dotenv').config();

// Initialize express
const app = express();
// Add port
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


// Connection string
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.twsrnvr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const menuCollection = client.db('foodie').collection('menu');
    }
    finally {

    }
}

run().catch(error => console.error(error));


// get request
app.get('/', (req, res) => {
    res.send("Foodie server is running");
});

// Initialize port
app.listen(port, () => {
    console.log(`Foodie server is running on ${port}`);
})