const jwt = require('jsonwebtoken');

const createJSONWebToken = (payload, secretKey, expiresIn)=>{
    try {
        const token = jwt.sign(payload, secretKey, {expiresIn});
        return token;

    } catch (error) {
        console.error('Failed to sign in the JWT: ', error);
        throw error;
    }

}


module.exports = {createJSONWebToken}