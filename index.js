// Add express
const express = require('express');
// Add cors
const cors = require('cors');
// Add JWT
const jwt = require('jsonwebtoken');
// Add mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
// Set username & password by dynamically
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.twsrnvr.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// JWT Token
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'unauthorized access' });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded;
        next();
    })
}


async function run() {
    try {
        // Declare database & collection
        const sliderCollection = client.db('foodie').collection('slider');
        const menuCollection = client.db('foodie').collection('menu');

        // JWT token by post request
        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' })
            res.send({ token })
        })

        // Load data from database for slider by get request
        app.get('/slider', async (req, res) => {
            const query = {}
            const cursor = sliderCollection.find(query);
            const slider = await cursor.toArray();
            res.send(slider)
        });

        // Load data from database for home by get request
        app.get('/', async (req, res) => {
            const query = {}
            const cursor = menuCollection.find(query);
            const home = await cursor.limit(3).toArray();
            res.send(home);
        });

        // Load data from database for menu by get request
        app.get('/menu', async (req, res) => {
            const query = {}
            const cursor = menuCollection.find(query);
            const menus = await cursor.toArray();
            res.send(menus);
        });

        // Load data from database for menu with id
        app.get('/menu/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const menu = await menuCollection.findOne(query);
            res.send(menu);
        })
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