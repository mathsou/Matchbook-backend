const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {book_id} = request.params;
        const user_id = response.locals.id;
        const photos = await connection('photos')
        .select("photos.id as photo_id", "photos.name as book", "size", "url", "book_id")
        .join("book", "photos.book_id", "=", "book.id")
        .where("book.user_id", user_id.id)
        .andWhere("photos.book_id", book_id)

        return response.json({"success": true, "status": 0, "message": "Success", "data": {photos}});
    },
    async create(request, response){
        const {book_id} = request.params;
        const { key: name, size, location: url = "" } = request.file;
        const user_id = response.locals.id;
        const userId = await connection('book').select('user_id').where('id', book_id).first();
        if(user_id.id === userId.user_id){
            await connection('photos')
            .insert({
                name,
                size,
                url,
                book_id
            });

         return response.json({"success": true, "status": 0, "message": "Success", "data": {name, size, url, book_id}});
        }
        return response.status(401).json({"success": false, "status": -3, "message": "Invalid user credentials"});

    }
}