const mongoose = require('mongoose');

var Database = {}

Database.start = function(){
    return new Promise((resolve, reject) => {

        // Initiate connection parameters with environment variable MONGODB_URI
        mongoose.connect(process.env.MONGODB_URI, {

            // Make sure we follow recommended options
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Declare db variable with above connection
        const db = mongoose.connection;

        // Set events
        db.on('error', reject);
        db.once('open', function() {

            // Resolve promise on success
            resolve()
        });
    })
}

module.exports = Database