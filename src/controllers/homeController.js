const connection = require('../database/connection');
const matchController = require('./matchController');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        //NOT READY
        const books = await connection('book')
        .select(["book.id", "book.name as book", "book.author", "user.id as user_id", "category", "city", 'photos.url as photo'])
        .join('user', 'user.id', '=', 'book.user_id')
        .where('book.user_id', "!=",user_id.id)
        .join('photos', 'photos.book_id', '=', 'book.id')
        .whereNotIn("book.id",
            connection('likes')
            .select("book_id")
            .where("user_id", user_id.id)
        )
        .orderByRaw('RAND()')
        
        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    },

    async create(request, response){
        const user_id = response.locals.id;
        const {book_id, liked} = request.body;

        if(typeof(book_id) === "number" || typeof(liked) === "boolean"){
            await connection('likes')
            .insert({
                liked,
                book_id,
                user_id: user_id.id
            });
            if(liked === 1){
                const matches = await connection('likes').select('book.id as book_id', 'likes.user_id')
                .join('book', 'book.id', '=', 'likes.book_id')
                .where('book.user_id', user_id.id)
                .andWhere('likes.liked', 1)
                if(matches.length > 0){
                    matches.map(function(match){
                        // console.log(book_id, match.book_id, user_id.id, match.user_id)
                        matchController.create(book_id, match.book_id, user_id.id, match.user_id)
                    })
                    
                    return response.json({"success": true, "status": 0, "message": "Success", "data": {"Match": true}});
                }
                return response.json({"success": true, "status": 0, "message": "Success", "data": {"Match": false}});
            }
            return response.json({"success": true, "status": 0, "message": "Success"});
        }
        return response.json({"success": false, "status": -2, "message": "Invalid value"});
    }
}