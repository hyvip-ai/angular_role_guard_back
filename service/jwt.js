const jwt = require('jwt-simple')
const SECRET = 'thisismysecret1234'

function createtoken(user){
    var payload = {
        sub:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }

    var token  = jwt.encode(payload,SECRET)
    return token

}
module.exports = {
    createtoken
}