const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        //NOT READY
        // const books = await connection('book')
        // .select('*')
        // .join('likes', 'book.id', '=', 'likes.book_id')
        // .join('user', 'user.id', '=', 'book.user_id')
        // .where('likes.user_id', user_id.id)
        // .orderByRaw('RAND()')
        // .limit(1)
        
        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    }
}