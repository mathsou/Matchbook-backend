const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        const {id} = request.query;
        if(id){
            const books = await connection('matches')
            .select([
                'matches.id',
                'matches.name',
                'matches.author',
                'matches.category'       
            ])
            .join('user', 'user.id', '=', 'book.user_id')
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
            'user.city'      
        ])
        .join('user', 'user.id', '=', 'book.user_id')
        .where('user_id', user_id.id);

        

        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    },

    async create(match_book_id, my_book_id, my_user_id, match_user_id){

        await connection('matches').insert({
            math_book_id: match_book_id, 
            my_book_id: my_book_id, 
            user_id: my_user_id
        });
        await connection('matches').insert({
            math_book_id: my_book_id, 
            my_book_id: match_book_id, 
            user_id: match_user_id
        });
    },

    async delete(request, response){
        const {id} = request.query;
        const user_id = response.locals.id;
        await connection('matches')
        .where('user_id', user_id.id)
        .andWhere('id', id)
        .del()
        return response.status(204).send();
    }
}