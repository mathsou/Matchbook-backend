const jwt = require('../middlewares/jwt');

const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const id = response.locals.idUser;
        const usuario = await connection('user')
        .select('userName', 'name', 'email')
        .where({id: id});
        return response.json({"success": true, "status": 0, "message": "Success", "data":{"registration": usuario}});
        
    },
    async create (request, response){
        const {userName, name, email, password, city} = request.body;
        const [id] = await connection('user').returning('id').insert({
            userName,
            name,
            email,
            password: crypto.createHash('md5').update(password).digest('hex'),
            city,
            show_email: 1
        }); 
        const userToken = {id}
        const token = jwt.sign({user: userToken})

        return response.json({"success": true, "status": 0, "message": "Success", "data":{id, token}});
    },


    async modify(request, response){
        var {userName, name, email, password} = request.body;
        const id = response.locals.idUser;
        await connection('usuarios')
        .where('id', id.id)
        .update({
            userName: userName,
            name: name,
            email: email,
            password: crypto.createHash('md5').update(senha).digest('hex'),
        });
        return response.status(204).send();
    }

};