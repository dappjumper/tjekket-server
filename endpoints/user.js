const mongoose = require('mongoose')

const defaultSecret = "SuperSecrecy" // Please don't let the app use this, specify JWT_SECRET env variable!

const endpoint = {}

const User = mongoose.model('User', require('./../schemas/user.js'))

const { scryptSync, randomBytes } = require('crypto');
const salt = (process.env.JWT_SECRET || defaultSecret).toString('hex')
const getHash = (password) => scryptSync(password, salt, 32).toString('hex')

const jwt = require('jsonwebtoken')


const jwtGen = (result)=>{
    return jwt.sign({
        id: result._id,
        role: result.role
    }, process.env.JWT_SECRET || defaultSecret)
}

const determineSelector = require('./../determineSelector')

endpoint.start = function(app, prefix='') {
    // Read user. Via ID or email. Authorized user, admin, or higher required.
    app.get('/user/:idEmailOrUsername', function(req,res){
        User.findOne({
            [(determineSelector(req.params.idEmailOrUsername))]:req.params.idEmailOrUsername
        }, (error, user) => {
            if(error || !user) res.status(404).send({status:404,error:"User not found"})
        })
    })

    // Create user, return JWT. Public. Returns JWT if user exists and password, email and username matches.
    // Additionally sets owner if the email matches and the user does not exist already
    app.put('/user', function(req, res){
        if(!req.body.email || !determineSelector(req.body.email) === 'email') return res.status(400).send({status:400,error:'No email specified'})
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
                    }, function(error, result) {
                        if(error) return res.status(403).send({status:403,error:"Incorrect password"})
                        return res.send({
                            status: 200,
                            token: jwtGen(result)
                        })
                    })
                } else {
                    //Something bad happened
                    return res.status(500).send({status:500,error:"Server error"})
                }
            }
            // Nothing tripped us up! Let's send them their token
            if(!tryLogin) return res.status(201).send({
                status: 201,
                token: jwtGen(result)
            })
        })
    })

    // Edit user, return new user. Authorized user, admin, or higher required.
    app.post('/user/:idEmailOrUsername', function(req, res){

    })

    // Delete user. Authorized user, admin, or higher required.
    app.delete('/user/:idEmailOrUsername')
}

module.exports = endpoint