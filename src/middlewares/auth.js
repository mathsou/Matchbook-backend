const jwt = require('./jwt');
const { promisify } = require("util");
const { Console } = require('console');

module.exports = 
    async (request, response, next) => {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).send({"success": false, "status": -3, "message": "No token provided", "data": {} });
        }

        const [scheme, token] = authHeader.split(" ");

        try {
            const decoded = await jwt.verify(token);
            response.locals.id = decoded.user;
            return next();
        } catch (err) {
            return response.status(401).send({"success": false, "status": -3, "message": "Token invalid", "data": {} });
    }
};