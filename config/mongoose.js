const mongoose =require('mongoose');
require('dotenv').config();

const client = mongoose.connect(process.env.DATABASE_KEY,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then((client,err)=>{
        if(err)console.log("DB error  ",err);
        console.log("DB connected");
        return client;
    })

module.exports = client;