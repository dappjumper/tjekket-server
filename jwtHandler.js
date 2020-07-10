const jwt = require('jsonwebtoken')

const jwtGen = (result)=>{
    return jwt.sign({
        id: result._id,
        role: result.role
    }, process.env.JWT_SECRET || defaultSecret)
}

const jwtVerify = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET || defaultSecret)
}

module.exports = {
    generate: jwtGen,
    verify: jwtVerify,
    protected: function(req, res, next) {
        if(!req.header('Authentication')) return res.status(400).send({status:400,error:'Missing Authentication header'})
        if(req.header('Authentication').indexOf('Bearer ') == -1) return res.status(400).send({status:400,error:'Malformed Authentication header. Use format: Bearer <token>'})

        let token = req.header('Authentication').replace('Bearer ','')
        try {
            req.user = jwtVerify(token)
            return next()
        } catch(e) {
            return res.status(403).send({status:403,error:'Bad Authentication token'})
        }
        req.user = jwtVerify(token)
    }
}