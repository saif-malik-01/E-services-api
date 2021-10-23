const express = require('express');
require('./config/mongoose');
const app = express();

const PORT = 4000;

app.get('/',(req,res)=>{
    res.status(200).json({status:200});
});

app.listen(PORT,(err)=>{
    if(err)console.log('Server error',err);
    console.log('server running on port :',PORT);
});
