const jwt = require('../middlewares/jwt');

const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index (request, response) {
        const user_id = response.locals.id;
        const profile = await connection('social')
        .select('socialMedia', 'userSocial', 'visible')
        .where("user_id", "=", user_id.id);
        return response.json({"success": true, "status": 0, "message": "Success", "data": profile});
        
    },
    async create (request, response){
        const user_id = response.locals.id
        const {socialMediaI, userSocialI, visibleI,socialMediaF, userSocialF, visibleF} = request.body;
        if(userSocialI != '' && socialMediaI === 'instagram'){

            await connection('social').insert({
                socialMedia: socialMediaI,
                userSocial: userSocialI,
                "user_id": user_id.id,
                visible: visibleI
                
            }); 
        }
        if(userSocialI != '' && socialMediaI === 'facebook'){

            await connection('social').insert({
                socialMedia: socialMediaF,
                userSocial: userSocialF,
                "user_id": user_id.id,
                visible: visibleF
                
            }); 
        }
            return response.json({"success": true, "status": 0, "message": "Success"});
        
        // return response.json({"success": false, "status": -2, "message": "Invalid value"});
        
    },


    async modify(request, response){
        var {socialMedia, userSocial, visible} = request.body;
        const user_id = response.locals.id;
        await connection('social')
        .where({
            "user_id": user_id.id,
            'socialMedia': socialMedia
        })
        .update({
            socialMedia: socialMedia,
            userSocial: userSocial,
            visible: visible
        });
        return response.status(204).send();
    }
};