// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
// log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());

var port = process.env.PORT || 8080; // set our port

// DATABASE SETUP
var mongoose = require('mongoose');
const { supplierController } = require('./Controllers/supplierController');
mongoose.connect('mongodb://localhost:27017/myapp'); // connect to our database

// Handle the connection event
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("DB connection alive");
});

//Models lives here


//Controllers lives here
app.use("/api/suppliers", supplierController);


// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

    // START THE SERVER
    // =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);