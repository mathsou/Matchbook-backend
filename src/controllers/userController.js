const jwt = require('../middlewares/jwt');

const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const id = response.locals.idUser;
        const usuario = await connection('user')
        .select('userName', 'name', 'email')
        .where({id: id});
        return response.json(usuario);
        
    },
    async create (request, response){
        const {userName, name, email, password} = request.body;
        await connection('user').insert({
            userName,
            name,
            email,
            password: crypto.createHash('md5').update(password).digest('hex')
        }); 
        const id = await connection('user').select('id').where({userName: userName}).first()
        const userToken = {id}
        const token = jwt.sign({user: userToken})
        return response.json({token});
        
    },


    async modify(request, response){
        var {userName, name, email, password} = request.body;
        const id = response.locals.idUser;
        await connection('usuarios')
        .where('id', id)
        .update({
            userName: userName,
            name: name,
            email: email,
            password: crypto.createHash('md5').update(senha).digest('hex'),
        });
        return response.status(204).send();
    }

};