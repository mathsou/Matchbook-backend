const crypto = require('crypto');
const connection = require('../database/connection');
const jwt = require('../middlewares/jwt');

module.exports = {
    async create(request, response){
        const {user, password} = request.body;
        const userSession = await connection('user')
            .select([
                'id',
                'userName',
                'name',
                'email',
                'password'])
            .where('userName', '=', user)
            .orWhere('email', '=', user)
            .first();

        if(userSession){
            passwordEncrypted = crypto.createHash('md5').update(password).digest('hex');
            if(passwordEncrypted == userSession.password){
                const userToken = {id: userSession.id}
                const token = jwt.sign({user: userToken})
                return response.json({"success": true, "status": 0, "message": "Success", "data":{"id":userSession.id, token}});
            }
            return response.json({error: 'Senha incorreta'})
        }
        return response.json({error: 'Usuario não encontrado'})
    }
}