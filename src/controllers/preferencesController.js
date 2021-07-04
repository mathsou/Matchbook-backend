const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const user_id = response.locals.id;
        const preferences = await connection('preferences')
        .select('id', 'user_id', 'preference')
        .where('user_id', user_id.id)
        .first();
        const preferenceArray = preferences.preference.split(',')
        return response.json({"success": true, "status": 0, "message": "Success", "data": {"id": preferences.id, 'preferences': preferenceArray}});
    },
    async create(request, response){
        const user_id = response.locals.id;
        const {preference} = request.body;
        
        const pref = await connection('preferences').select('user_id').where('user_id', user_id.id);
        if(Array.isArray(preference)){
            if(pref.length >= 1){
                await connection('preferences')
                .where('user_id', user_id.id)
                .update({
                    preference: preference.toString(),
                    user_id: user_id.id
                });
            }else{
                await connection('preferences')
                .insert({
                    preference: preference.toString(),
                    user_id: user_id.id
                });
            }
           
            return response.json({"success": true, "status": 0, "message": "Success"});
        }
        return response.json({"success": false, "status": -2, "message": "Invalid value"});
    }
}