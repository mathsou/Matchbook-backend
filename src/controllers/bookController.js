const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        const {id} = request.query;
        if(id){
            const books = await connection('book')
            .select([
                'book.id',
                'book.name',
                'book.author',
                'book.category',
                'photos.url as photo'      
            ])
            .join('user', 'user.id', '=', 'book.user_id')
            .join('photos', 'photos.book_id', '=', 'book.id')
            .where('user_id', user_id.id)
            .andWhere('book.id', id)
            .first()
            return response.json({"success": true, "status": 0, "message": "Success", "data": books});
        }
        const books = await connection('book')
        .select([
            'book.id',
            'book.name',
            'book.author',
            'book.category',
            'user.city',   
            'photos.url as photo'      
        ])
        .join('user', 'user.id', '=', 'book.user_id')
        .join('photos', 'photos.book_id', '=', 'book.id')
        .where('user_id', user_id.id);

        

        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    },

    async create(request, response){
        const {name, author, category} = request.body;
        const user_id = response.locals.id;
        const book_id = await connection('book').returning('id').insert({
            name,
            author,
            user_id: user_id.id,
            category_id: 2,
            category
        });
        return response.json({"success": true, "status": 0, "message": "Success", "data": book_id});
    },

    async modify(request, response){
        const {name, author, category} = request.body;
        const {id} = request.query;
        const user_id = response.locals.id;
        await connection('book')
        .where('user_id', user_id.id)
        .andWhere('id', id)
        .update({
            name: name,
            author: author,
            category: category
        });
        return response.status(204).send();
    },

    async delete(request, response){
        const {id} = request.query;
        const user_id = response.locals.id;
        
        await connection('matches')
        .andWhere('my_book_id', id)
        .del()

        await connection('matches')
        .andWhere('math_book_id', id)
        .del()

        await connection('likes')
        .andWhere('book_id', id)
        .del()

        await connection('photos')
        .andWhere('photos.book_id', id)
        .del()

        await connection('book')
        .where('user_id', user_id.id)
        .andWhere('id', id)
        .del()

        return response.json({"success": true, "status": 0, "message": "Success"});
    }
}