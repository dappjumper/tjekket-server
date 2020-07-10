const determineSelector = function(identifier) {
    // If no identifier provided then return false
    if(!identifier) return false

    // If identifier contains @ and . then return email
    if(identifier.indexOf('@') > -1 && identifier.indexOf('.') > -1) return 'email'

    // If identifier is a valid ObjectId then return id
    if(mongoose.ObjectId.isValid(identifier)) return 'id'

    // If none of the above then return username
    return 'username'
}

module.exports = determineSelector