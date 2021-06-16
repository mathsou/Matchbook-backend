const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const { originalname: name, size, filename: photo, location: url = "" } = request.file;

        const photos = await {
            photo,
            size,
            url
        }


         return response.json({"success": true, "status": 0, "message": "Success", "data":{photos}});
        

    }
}