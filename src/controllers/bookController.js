const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        const books = await connection('book')
        .select([
            'book.id',
            'book.name',
           'book.author',
            'category.description'       
        ])
        .join('user', 'user.id', '=', 'book.user_id')
        .join('category', 'category.id', '=', 'book.category_id')
        .where('user_id', user_id.id);

        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    },

    async create(request, response){
        const {name, author, category_id} = request.body;
        const user_id = response.locals.id;
        await connection('book').insert({
            name,
            author,
            user_id: user_id.id,
            category_id
        });
        return response.json({"success": true, "status": 0, "message": "Success"});
    }
}