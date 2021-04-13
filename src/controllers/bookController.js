const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const books = await connection('book')
        .select('*')
        .orderByRaw('RAND()')
        .limit(1)
        
        return response.json(books);
    }
}