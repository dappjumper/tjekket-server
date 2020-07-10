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
        if(!req.header('Authorization')) return res.status(400).send({status:400,error:'Missing Authorization header'})
        if(req.header('Authorization').indexOf('Bearer ') == -1) return res.status(400).send({status:400,error:'Malformed Authorization header. Use format: Bearer <token>'})

        let token = req.header('Authorization').replace('Bearer ','')
        try {
            req.user = jwtVerify(token)
            return next()
        } catch(e) {
            return res.status(400).send({status:400,error:'Bad Authorization token'})
        }
        req.user = jwtVerify(token)
    }
}