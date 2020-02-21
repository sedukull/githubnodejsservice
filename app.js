const express = require('express');
const bodyParser = require('body-parser');
const log = require('loglevel')
const dbConfig = require('./config/database_config')
const appConfig = require('./config/app_config')

log.setDefaultLevel(log.levels.INFO);
require('dotenv').config()

const environment = process.env.NODE_ENV || 'development';
const servicePort = appConfig[environment].port;

log.info(`==== Environment Information: ${environment} ====`)

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// database client module
const mongoose = require('mongoose');

log.info(`==== Service port information ====  ${servicePort}`);

mongoose.Promise = global.Promise;

// Database connection.
mongoose.connect(dbConfig[environment].url, {
	useNewUrlParser: true
}).then(() => {
    log.info("Successfully connected to the database");    
}).catch(err => {
    log.info('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to github comments application."});
});

require('./app/routes/org.routes.js')(app);

// listen for requests
app.listen(servicePort, () => {
    log.info(`Server is listening on port ${servicePort}`);
});