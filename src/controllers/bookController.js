const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        const {book_id} = request.params;
        if(book_id){
            const books = await connection('book')
            .select([
                'book.id',
                'book.name',
                'book.author',
                'book.category'       
            ])
            .join('user', 'user.id', '=', 'book.user_id')
            .where('user_id', user_id.id)
            .andWhere('book.id', book_id)
            .first()
            }else{
                const books = await connection('book')
                .select([
                    'book.id',
                    'book.name',
                    'book.author',
                    'book.category',
                    'user.city'      
                ])
                .join('user', 'user.id', '=', 'book.user_id')
                .where('user_id', user_id.id);

            }

        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    },

    async create(request, response){
        const {name, author, category} = request.body;
        const user_id = response.locals.id;
        await connection('book').insert({
            name,
            author,
            user_id: user_id.id,
            category_id: 2,
            category
        });
        return response.json({"success": true, "status": 0, "message": "Success"});
    }
}