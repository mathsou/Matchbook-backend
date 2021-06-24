const connection = require('../database/connection');
require('dotenv').config();
const aws = require('aws-sdk');

const s3 = new aws.S3();

module.exports = {
    async index(request, response){
        const {book_id} = request.query;
        const user_id = response.locals.id;
        if(book_id){
            const photos = await connection('photos')
            .select("photos.id as photo_id", "photos.name as photo", "size", "url", "book_id")
            .join("book", "photos.book_id", "=", "book.id")
            .where("book.user_id", user_id.id)
            .andWhere("photos.book_id", book_id)
    
            return response.json({"success": true, "status": 0, "message": "Success", "data": {photos}});
        }
        return response.json({"success": false, "status": -2, "message": "Invalid value", "data": {}});        
    },
    async create(request, response){
        const {book_id} = request.query;
        const user_id = response.locals.id;
        if(book_id){
            const userId = await connection('book').select('user_id').where('id', book_id).first();
            if(user_id.id === userId.user_id){
                request.files.map(async function(file){
                    const { key: name, size, location: url = "" } = file;
                    await connection('photos')
                    .insert({
                        name,
                        size,
                        url,
                        book_id
                    });
                });
                return response.json({"success": true, "status": 0, "message": "Success", "data": {}});
            }
            return response.status(401).json({"success": false, "status": -3, "message": "Invalid user credentials"});
        }
        return response.json({"success": false, "status": -2, "message": "Invalid value", "data": {}});        


    },
    async remove(request, response){
        const {book_id, photo} = request.query;
        const user_id = response.locals.id;
        if(book_id){
            const userId = await connection('book')
            .select('user_id')
            .where('id', book_id)
            .first();
            if(user_id.id === userId.user_id){
                if (photo){
                    // try{
                        await s3.deleteObject ({
                            Bucket: "matchbookuploads",
                            Key: "9d500cc1-pjo-mdt-2.jpg"
                        }, function(err, data){
                            if(err) console.log(err, err.stack);
                            else console.log(data);
                        }).promise().catch(err => {
                            console.log(err);
                        });
                    // } catch{
                        return response.status(200).send()//.json({"success": false, "status": -9, "message": "Internal error", "data": {}}); 
                    // }                   
                    await connection('photos')
                    .where('book_id', book_id)
                    .andWhere('name', photo)
                    .del();
                }
                else{
                    let fail = false;
                    const photos = await connection('photos').select('name').where('id', book_id);
                    photos.map(async function(pht){
                        try{
                            await s3.deleteObject({
                                bucket: process.env.BUCKET_NAME,
                                key: pht.name
                            }).promise();
                        } catch{
                            fail = true;
                            return false; 
                        } 
                        await connection('photos')
                            .where('book_id', book_id)
                            .andWhere('name', pht.name)
                            .del(); 
                    })
                    if(fail) return response.status(500).json({"success": false, "status": -9, "message": "Internal error", "data": {}}); 
                }
                return response.json({"success": true, "status": 0, "message": "Success", "data": {}});
            }
            return response.status(401).json({"success": false, "status": -3, "message": "Invalid user credentials"});
        }
        return response.json({"success": false, "status": -2, "message": "Invalid value", "data": {}});        
    }
}