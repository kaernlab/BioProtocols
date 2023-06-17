require('dotenv').config();

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const { connectDB } = require('./config/db');
var cors = require('cors')
const { notFound, errorHandler } = require('./middleware');

const app = express();

// Connect Database
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for testing purposes
app.get('/test', (req, res) => {
  res.status(200).send({ text: 'Simple Node App Working!' });
});

routes(app);

app.use(notFound);
app.use(errorHandler);

module.exports = app;