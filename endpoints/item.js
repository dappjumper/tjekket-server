const mongoose = require('mongoose')

const endpoint = {}

const Item = mongoose.model('Item', require('./../schemas/item.js'))

const determineSelector = require('./../determineSelector')

endpoint.start = function(app, prefix='') {
    // Read item. Via ID or slug. Public.
    app.get('/item/:idOrSlug', function(req, res){

    })

    // Create item. Admin or higher required.
    app.put('/item', function(req, res){

    })

    // Edit item. Admin or higher required.
    app.post('/item/:idOrSlug', function(req, res){

    })

    // Delete item. Admin or higher required.
    app.delete('/item/:idOrSlug', function(req, res){

    })
}

module.exports = endpoint