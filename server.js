// Import express
const express = require('express')

// Import bodyParser
const bodyParser = require('body-parser')

// Import CORS
const cors = require('cors')

// Import axios, the superior successor to request module
const axios = require('axios')

// Import our database module
const database = require('./database')

// Create instance of express
const app = express()


// load local environment variables from .env file if environment variable isProduction  is not set
if(!process.env.isProduction) {
    require('dotenv').config()
}

// Set the port variable to environment variable or 8000 if undeclared
const port = process.env.PORT || 8000

// Configure express to use CORS (by default allow * origin)
app.use(cors())

// Configure middleware bodyParser.json to be used by our application
app.use(bodyParser.json());

// To also support urlencoding (this gives warning if omitted)
app.use(bodyParser.urlencoded({
  extended: true
}));

const fs = require('fs')

var endpoints = []

// Get all endpoints and enable them
fs.readdir('./endpoints', (err, files) => {
  files.forEach(file => {
    // Add the filename and relative path to endpoints array
    endpoints.push(require('./endpoints/'+file))

    // Start the endpoint module passing app instance
    endpoints[endpoints.length-1].start(app)
  });
});

// Start database connection
database.start()
    .then( () => {

        // Start the server on PORT
        let server = app.listen(port, () => console.log(`Tjekket challenge listening on port: ${port}`))

        // Spin up E2E test if asked to
        if(process.env.TEST) {

            // Spin up the testing file
            let e2etest = require('./testing/e2e').start(server)
        }
    })
    .catch( () => {
        throw 'Database connection failed!'
    })
