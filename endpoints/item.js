const mongoose = require('mongoose')

const endpoint = {}

const Item = mongoose.model('Item', require('./../schemas/item.js'))
const Catalog = mongoose.model('Catalog', require('./../schemas/catalog.js'))

const jwtHandler = require('./../jwtHandler')

endpoint.start = function(app, prefix='') {

    // Get all catalogs
    app.get('/items', function(req, res){
        Catalog.find(function(error, catalogResult){
            if(error || !catalogResult) return res.status(404).send({status:404,error:'Not found'})

            return res.status(200).send({status:200,catalogs:catalogResult})
        })
    })

    // Read item. Via ID or slug. Public.
    app.get('/item/:id', function(req, res){
        if(!req.params.id) return res.status(400).send({status:400,error:'ID not specified'})
        Item.findOne({
            _id:mongoose.Types.ObjectId(req.params.id)
        }, function(error, result){
            if(error || !result) return res.status(404).send({status:404,error:'Not found'})
            return res.status(200).send({status:200,item:result})
        })
    })

    // Create item. Admin or higher required.
    app.put('/item', jwtHandler.protected, function(req, res){
        if(req.user.role === 'user') return res.status(403).send({status:403,error:'Not authorized'})
        if(!req.body.name) return res.status(400).send({status:400,error:'Name not specified'})
        if(!req.body.price) return res.status(400).send({status:400,error:'Price not specified'})
        let newItem = new Item({
            name: req.body.name,
            price: req.body.price,
            catalogs: []
        })
        if(req.body.catalogs) newItem.catalogs = req.body.catalogs
        newItem.save(function(error, result) {
            if(error) return res.status(400).send({status:400,error:'Error creating item'})
            return res.status(201).send({status:201,item:result})
        })
    })

    // Edit item. Admin or higher required.
    app.post('/item', jwtHandler.protected, function(req, res){
        if(req.user.role === 'user') return res.status(403).send({status:403,error:'Not authorized'})
        if(!req.body.id) return res.status(400).send({status:400,error:'ID not specified'})
        let updates = {}
        if(req.body.name) updates.name = req.body.name
        if(req.body.price) updates.price = req.body.price
        if(req.body.catalogs) updates.catalogs = req.body.catalogs
        Item.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, updates, function(error, result){
            if(!result) return res.status(404).send({status:404,error:'Item not found'})
            if(error) return res.status(500).send({status:500,error:'Failed updating item'})
            return res.status(200).send()
        })
    })

    // Delete item. Admin or higher required.
    app.delete('/item/:id', jwtHandler.protected, function(req, res){
        if(req.user.role === 'user') return res.status(403).send({status:403,error:'Not authorized'})
        if(!req.params.id) return res.status(400).send({status:400,error:'ID not specified'})
        Item.deleteOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, function(error, result){
            if(!result) return res.status(404).send({status:404,error:'Item not found'})
            if(error) return res.status(500).send({status:500,error:'Failed deleting item'})
            return res.status(200).send()
        })
    })
}

module.exports = endpoint