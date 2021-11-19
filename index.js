const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user = require('./models/user');
const app = express();
const cors = require("cors");
const userRoutes = require('./controllers/userController');
require('dotenv').config();

const PORT = 4000;


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/user',userRoutes);



app.post('/login',async(req,res)=>{
   try {
      const {email,password} = req.body;
      const User = await user.findOne({emailOrNum});
      if (User && bcrypt.compareSync(password,User.password)) {
        const token = jwt.sign(
          { password },
          process.env.ACCESS_TOKEN_SIGNATURE , {expiresIn:'1h'}
        ); 
        return res.cookie("AUTH_TOKEN",token).json(User);
      } else {
        return res.status(404).json({ code: 404, message: "user not found" });
      }
    } catch (error) {
        res.status(400).json({ code: 400, required: "All Fields are required" });
    }

})


app.post('/signup',async(req,res)=>{
  if(req.body.token){
      const Id = "TOKEN";
      const client = new OAuth2Client(Id);
      const ticket = await client.verifyIdToken({idToken:req.body.token,audience:Id});
      const payload =  ticket.getPayload();
      if(payload.email_verified){
        const password = await bcrypt.hash(`${payload.name}`,4); 
        const User = await user.create({username:payload.name,emailOrNum:payload.email,password,picture:payload.picture});  
        const token = jwt.sign(
          { password },
          process.env.ACCESS_TOKEN_SIGNATURE , {expiresIn:'1h'}
        ); 
        return res.cookie("AUTH_TOKEN",token).json(User);
      }else{
        return res.redirected('/login');
      }

  }else{
     try {
    let {username,email,password} = req.body; 
    password = await bcrypt.hash(`${password}`,4); 
    const User = await user.create({username,email,password});  
     const token = jwt.sign(
          { password },
          process.env.ACCESS_TOKEN_SIGNATURE , {expiresIn:'2h'}
        ); 
    return res.cookie("AUTH_TOKEN",token).json(User);
   } catch (error) {
       console.log(error)
       res.status(400).json({code:400,required:"All Fields",minPass:6});
    }
  }
})


app.post('/verify',async(req,res)=>{
  try{
     const isverified = await jwt.verify(req.cookies.token,process.env.ACCESS_TOKEN_SIGNATURE);
     res.status(200).json({status:200});
  }catch(err){
     return  res.status(404).json({status:404});
  }
})

app.use('/',require('./routes'));
app.listen(PORT,(err)=>{
    if(err)console.log('Server error',err);
    console.log('server running on port :',PORT);
});
