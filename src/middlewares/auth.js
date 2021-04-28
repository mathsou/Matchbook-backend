const jwt = require('./jwt');
const { promisify } = require("util");
const { Console } = require('console');

module.exports = 
    async (request, response, next) => {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).send({ error: "No token provided" });
        }

        const [scheme, token] = authHeader.split(" ");

        try {
            const decoded = await jwt.verify(token);
            response.locals.idUser = decoded.idUser;
            return next();
        } catch (err) {
            return response.status(401).send({ error: "Token invalid" });
    }
};