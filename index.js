const hapi = require("@hapi/hapi")
const Customer= require("./service/services")
const router = new Customer();
const Joi = require('@hapi/joi');


const init = async()=>{
    const server= hapi.server({
        port:3030,
        host:'localhost'
    })

    server.route({
        method:"POST",
        path:"/insert",
        options: {
            validate: {
              payload: Joi.object({
                // id:Joi.number().integer().greater(0),
                full_name:Joi.string().min(1).max(50),
                email:Joi.string().email(),
                password:Joi.string().min(8).max(16).required(),
                age:Joi.number().integer(),
                Ph_Number:Joi.required()
              }),
            },
        handler:router.insertDetail
        }
        
    });
    server.route({
        method:'GET',
        path:'/getall',
        handler:router.getData   
    });
    server.route({
        method:'PUT',
        path:'/update/{id}',
        options: {
            validate: {
              payload: Joi.object({
                // id:Joi.number().integer().greater(0),
                full_name:Joi.string().min(1).max(50),
                email:Joi.string().email(),
                password:Joi.string().min(8).max(16).required(),
                age:Joi.number().integer(),
                Ph_Number:Joi.required()
              }),
            },
        handler:router.updateData
        }
        
    });
    server.route({
        method:'DELETE',
        path:'/del/{id}',
        handler:router.deleteData
        
    });
    server.route({
        method:'GET',
        path:'/Data/{id}',
        handler:router.getDataById
        
    });


    await server.start();
    console.log("server running on",server.info.uri);
};
process.on('unhandledRejection',(err)=>{
    console.log(err);
})

init();