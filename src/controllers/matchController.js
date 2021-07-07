const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        const {id} = request.query;
        if(id){
            const book = await connection('matches')
            .select([
                'matches.id',
                'book.name as book',
                'book.category',
                'book.author',
                'photos.url as photo',
                'user.city',
                'user.name',
                'user.email',  
                'socialI.userSocial as instagram',
                'socialI.visible as show_instagram',
                'socialF.userSocial as facebook',
                'socialF.visible as show_facebook'     
            ])
            .leftJoin('book', 'book.id', '=', 'matches.math_book_id') 
            .leftJoin('photos', 'book.id', '=', 'photos.book_id') 
            .leftJoin('user', 'user.id', '=', 'book.user_id') 
            .leftJoin({socialI: 'social'}, function(){
                this.on('user.id', '=', 'socialI.user_id').andOn('socialI.socialMedia', '=', connection.raw('?', ['instagram']))
            })
            .leftJoin({socialF: 'social'}, function(){
                this.on('user.id', '=', 'socialF.user_id').andOn('socialF.socialMedia', '=', connection.raw('?', ['facebook']))
            })
            .where('matches.user_id', user_id.id)
            .andWhere('matches.id', id)
            .first()
            return response.json({"success": true, "status": 0, "message": "Success", "data": book});
        }
        const books = await connection('matches')
        .select([
            'matches.id',
            'book.id as book_id',
            'book.name as book',
            'photos.url as photo',     
        ])
        .join('book', 'book.id', '=', 'matches.math_book_id')
        .join('photos', 'photos.book_id', '=', 'book.id')
        .where('matches.user_id', user_id.id);

        

        return response.json({"success": true, "status": 0, "message": "Success", "data": books});
    },

    async create(match_book_id, my_book_id, my_user_id, match_user_id){
        const my_match = await connection('matches')
        .select('*')
        .where('user_id', my_user_id)
        .andWhere('math_book_id', match_book_id)
        if(my_match.length === 0){
            await connection('matches').insert({
                math_book_id: match_book_id, 
                my_book_id: my_book_id, 
                user_id: my_user_id
            });
        }
        const other_match = await connection('matches')
        .select('*')
        .where('user_id', match_user_id)
        .andWhere('math_book_id', my_book_id)
        if(other_match.length === 0){
            await connection('matches').insert({
                math_book_id: my_book_id, 
                my_book_id: match_book_id, 
                user_id: match_user_id
            });
        }
    },

    async delete(request, response){
        const {id} = request.query;
        const user_id = response.locals.id;
        await connection('matches')
        .where('user_id', user_id.id)
        .andWhere('id', id)
        .del()
        return response.json({"success": true, "status": 0, "message": "Success"});
    }
}