const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        const haveBooks = await connection('book')
        .select([
            'book.id'    
        ])
        .where('user_id', user_id.id)
        .first()
        const have = haveBooks ? true : false
        return response.json({"success": true, "status": 0, "message": "Success", "data": have});
    }
}