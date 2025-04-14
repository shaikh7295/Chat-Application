const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
require('./config/dbConfig'); 
const cors = require('cors');
corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
cors(corsOptions);
app.use(cors(corsOptions));

module.exports = app;
