const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        //NOT READY
        const books = await connection('book')
        .select(["book.id", "book.name as book", "book.author", "user.id as user_owner","user.name"])
        .join('user', 'user.id', '=', 'book.user_id')
        .where('book.user_id', "!=",user_id.id)
        .whereNotIn("book.id",
            connection('likes')
            .select("book_id")
            .where("user_id", user_id.id)
        )
        .orderByRaw('RAND()')
        .limit(1)
        
        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    },

    async create(request, response){
        const user_id = response.locals.id;
        const {preference} = request.body;

        
        if(typeof(book_id) === "number" || typeof(liked) === "boolean"){
            await connection('likes')
            .insert({
                liked,
                book_id,
                user_id: user_id.id
            });
           
            return response.json({"success": true, "status": 0, "message": "Success"});
        }
        return response.json({"success": false, "status": -2, "message": "Invalid value"});
    }
}