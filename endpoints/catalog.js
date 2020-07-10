const mongoose = require('mongoose')

const endpoint = {}

const Catalog = mongoose.model('Catalog', require('./../schemas/catalog.js'))

const determineSelector = require('./../determineSelector')

endpoint.start = function(app, prefix='') {
    // Read catalog. Via ID or slug. Public.
    app.get('/catalog/:idOrSlug', function(req, res){

    })

    // Create catalog. Admin or higher required.
    app.put('/catalog', function(req, res){

    })

    // Edit catalog. Admin or higher required.
    app.post('/catalog', function(req, res){

    })

    // Delete catalog. Admin or higher required.
    app.delete('/catalog/:idOrSlug', function(req, res){

    })
}

module.exports = endpoint