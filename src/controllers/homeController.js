const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        //NOT READY
        const books = await connection('book')
        .select('*')
        .orderByRaw('RAND()')
        .limit(1)
        
        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    }
}