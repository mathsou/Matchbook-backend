const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        return true;
    },
    async create(request, response){
        const {book_id} = request.params;
        const { filename: photo, size, location: url = "" } = request.file;
        const user_id = response.locals.id;
        const userId = await connection('book').select('user_id').where('id', book_id);
        console.log(user_id, userId);
        await connection('photos')
            .insert({
                photo,
                size,
                book_id
            });


         return response.json({"success": true, "status": 0, "message": "Success"});
        

    }
}