const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;



// Middlewares
app.use(express.json());
app.use(cors());

// Check if routes directory exists
try {
    const routes = readdirSync('./routes');
    routes.forEach((route) => {
        app.use('/api', require('./routes/' + route));
    });
} catch (error) {
    console.error('Error loading routes:', error);
    process.exit(1);
}

// Start server
const server = () => {
    db().then(() => {
        app.listen(PORT, () => {
            console.log('Server is running on port:', PORT);
        });
    }).catch((error) => {
        console.error('DB Connection Error:', error);
        process.exit(1); // Exit process with failure
    });
};

server();
