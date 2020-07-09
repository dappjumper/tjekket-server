const endpoint = {}
const catalogSchema = require('./../schemas/catalog.js')

endpoint.start = function(app, prefix='') {
    app.get(prefix+'/catalog/:id?', function(req, res) {
        if(!req.params.id) return res.status(204).send({"status":"204","error":"No ID specified"})
        
    })
}

module.exports = endpoint