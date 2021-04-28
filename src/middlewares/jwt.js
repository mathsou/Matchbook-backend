const jwt = require('jsonwebtoken');

const secret = '4a94fff6ea114ebc86e55e0e5043b29f';
module.exports = {
    sign(payload){
        return jwt.sign(payload, secret, {expiresIn: 86400});
    },
    verify(token){
        return jwt.verify(token, secret);
    }
}