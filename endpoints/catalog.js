const mongoose = require('mongoose')

const endpoint = {}

const Catalog = mongoose.model('Catalog', require('./../schemas/catalog.js'))
const Item = mongoose.model('Item', require('./../schemas/item.js'))

const jwtHandler = require('./../jwtHandler')

endpoint.start = function(app, prefix='') {
    // Read catalog. Via ID or slug. Public.
    app.get('/catalog/:id', function(req, res){
        if(!req.params.id) return res.status(400).send({status:400,error:'ID not specified'})
        Catalog.findOne({
            _id:mongoose.Types.ObjectId(req.params.id)
        }, function(error, catalogResult){
            if(error || !catalogResult) return res.status(404).send({status:404,error:'Not found'})
            
            //Base catalog found. Append items to it
            Item.find({
                catalogs: {
                    $in: [catalogResult._id]
                }
            }, function(error, result) {
                if(error) return res.status(400).send({status:400,error:'Failed to populate catalog'})

                let newCatalog = catalogResult.toObject()
                newCatalog.items = result

                return res.status(200).send({status:200,catalog:newCatalog})
            })

            //return res.status(200).send({status:200,catalog:result})
        })
    })

    // Create catalog. Admin or higher required.
    app.put('/catalog', jwtHandler.protected, function(req, res){
        if(req.user.role === 'user') return res.status(403).send({status:403,error:'Not authorized'})
        if(!req.body.name) return res.status(400).send({status:400,error:'Name not specified'})
        let newCatalog = new Catalog({
            name: req.body.name
        })
        newCatalog.save(function(error, result) {
            if(error || !result) return res.status(400).send({status:400,error:'Error creating catalog'})
            return res.status(201).send({status:201,catalog:result})
        })
    })

    // Edit catalog. Admin or higher required.
    app.post('/catalog', jwtHandler.protected, function(req, res){
        if(req.user.role === 'user') return res.status(403).send({status:403,error:'Not authorized'})
        if(!req.body.id) return res.status(400).send({status:400,error:'ID not specified'})
        let updates = {}
        if(req.body.name) updates.name = req.body.name
        Catalog.updateOne({
            _id: mongoose.Types.ObjectId(req.body.id)
        }, updates, function(error, result){
            if(!result) return res.status(404).send({status:404,error:'Catalog not found'})
            if(error) return res.status(400).send({status:400,error:'Failed updating catalog'})
            return res.status(200).send()
        })
    })

    // Delete catalog. Admin or higher required.
    app.delete('/catalog/:id', jwtHandler.protected, function(req, res){
        if(req.user.role === 'user') return res.status(403).send({status:403,error:'Not authorized'})
        if(!req.params.id) return res.status(400).send({status:400,error:'ID not specified'})
        Catalog.deleteOne({
            _id: mongoose.Types.ObjectId(req.params.id)
        }, function(error, result){
            if(!result) return res.status(404).send({status:404,error:'Catalog not found'})
            if(error) return res.status(400).send({status:400,error:'Failed deleting catalog'})
            return res.status(200).send()
        })
    })
}

module.exports = endpoint