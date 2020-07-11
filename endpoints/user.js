const mongoose = require('mongoose')

const defaultSecret = "SuperSecrecy" // Please don't let the app use this, specify JWT_SECRET env variable!

const endpoint = {}

const User = mongoose.model('User', require('./../schemas/user.js'))

const { scryptSync, randomBytes } = require('crypto');
const salt = (process.env.JWT_SECRET || defaultSecret).toString('hex')
const getHash = (password) => scryptSync(password, salt, 32).toString('hex')

const jwtHandler = require('./../jwtHandler')

endpoint.start = function(app, prefix='') {

    // Get all users
    app.get('/users', jwtHandler.protected, function(req, res){
        if(req.user.role !== 'owner') return res.status(403).send({status:403,error:"Not authorized"})
        Catalog.find(function(error, users){
            if(error || !users) return res.status(404).send({status:404,error:'Not found'})

            return res.status(200).send({status:200,users:users})
        })
    })

    // Read user. Via ID or email. Authorized user, admin, or higher required.
    app.get('/user/:id', jwtHandler.protected, function(req,res){
        if(req.user.role == 'user' && req.user.id.toString() !== result._id.toString()) return res.status(403).send({status:403,error:"Not authorized"})
        User.findOne({
            _id:mongoose.Types.ObjectId(req.params.id)
        }, (error, result) => {
            if(error || !result) return res.status(404).send({status:404,error:"User not found"})

            let foundUser = result.toObject()

            delete foundUser.password

            res.status(200).send({status:200,user:foundUser})
        })
    })

    // Create user, return JWT and user. Public. Returns JWT and user if user exists and password, email and username matches.
    // Additionally sets owner if the email matches environment variable and the user does not exist already
    app.put('/user', function(req, res){
        if(!req.body.email) return res.status(400).send({status:400,error:'No email specified'})
        if(!req.body.password) return res.status(400).send({status:400,error:'No password specified'})
        if(!req.body.username) return res.status(400).send({status:400,error:'No username specified'})
        let newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: getHash(req.body.password)
        })

        if(req.body.email === process.env.OWNER_EMAIL) {
            // This will only fire in the event that the email is set as owner in environment variable
            // Please note that it will only elevate the user does it not already exist (for some reason)
            newUser.isVerified = true
            newUser.role = 'owner'
        }

        newUser.save((error, result)=>{
            let tryLogin = false
            if(error) {
                if(error.code === 11000) {
                    //User already exists, lets test their password and give them a JWT token anyway!
                    tryLogin = true
                    User.findOne({
                        email: req.body.email,
                        username: req.body.username,
                        password: newUser.password
                    }, {password: false}, function(error, result) {
                        if(error) return res.status(403).send({status:403,error:"Incorrect password"})
                        if(!result) return res.status(409).send({status:409,error:'Email and username does not match existing user'})
                        return res.send({
                            status: 200,
                            token: jwtHandler.generate(result),
                            user: result
                        })
                    })
                } else {
                    //Something bad happened
                    return res.status(500).send({status:500,error:"Server error"})
                }
            }
            
            if(tryLogin) return;

            let insertedUser = result.toObject()

            delete insertedUser.password

            return res.status(201).send({
                status: 201,
                token: jwtHandler.generate(result),
                user: insertedUser
            })
        })
    })

    // Edit user, return new user. Authorized user, admin, or higher required.
    // Untested out of scope
    app.post('/user', jwtHandler.protected, function(req, res){
        let idToUpdate = mongoose.Types.ObjectId(req.user.id)

        if(req.body.id && req.user.role !== 'user') {
            idToUpdate = mongoose.Types.ObjectId(req.body.id)
        } else {
            if((req.body.id || req.user.id) !== req.user.id && req.user.role == 'user') return res.status(403).send({status:403,error:"Unauthorized"})
        }

        let updates = {}

        if(req.body.email) updates.email = req.body.email
        if(req.body.username) updates.email = req.body.username
        if(req.body.name) updates.name = req.body.name
        if(req.body.password) updates.password = getHash(req.body.password)

        User.findOneAndUpdate({_id:idToUpdate}, updates, {password: false}, function(error, result){
            if(error) return res.status(500).send({status:500,error:"Could not update user"})

            if(result) return res.status(200).send()
        })
    })

    // Delete user. Authorized user, admin, or higher required.
    // Untested out of scope
    app.delete('/user', jwtHandler.protected, function(req, res){
        let idToRemove = mongoose.Types.ObjectId(req.user.id)

        if(req.body.id && req.user.role !== 'user') {
            idToRemove = mongoose.Types.ObjectId(req.body.id)
        } else {
            if(req.body.id !== req.user.id && req.user.role == 'user') return res.status(403).send({status:403,error:"Unauthorized"})
        }

        User.deleteOne({_id:idToRemove}, function(error, result){
            if(error) return res.status(500).send({status:500,error:"Could not delete user"}) 
            if(result) return res.status(200).send()
        })
    })
}

module.exports = endpoint