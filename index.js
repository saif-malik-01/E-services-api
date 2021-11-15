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
require('dotenv').config();

const PORT = 4000;


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.post('/login',async(req,res)=>{
   try {
      const {emailOrNum,password} = req.body;
      const User = await user.findOne({emailOrNum});
      if (User && bcrypt.compareSync(password,User.password)) {
        const token = jwt.sign(
          { password },
          process.env.ACCESS_TOKEN_SIGNATURE , {expiresIn:'1h'}
        ); 
        return res.cookie("token",`${token}`).json(User);
      } else {
        return res.status(404).json({ code: 404, message: "user not found" });
      }
    } catch (error) {
        res.status(401).json({ code: 401, required: "All Fields are required" });
    }

})


app.post('/signup',async(req,res)=>{

  if(req.body.token){
      const Id = "913535745495-lut092uh58c03k8b3okk97vkndc0gnei.apps.googleusercontent.com";
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
        return res.cookie("token",`${token}`).json(User);
      }else{
        return res.redirected('/login');
      }

  }else{
     try {
    let {username,emailOrNum,password} = req.body; 
    password = await bcrypt.hash(`${password}`,4); 
    const User = await user.create({username,emailOrNum,password});  
     const token = jwt.sign(
          { password },
          process.env.ACCESS_TOKEN_SIGNATURE , {expiresIn:'1h'}
        ); 
    return res.cookie("token",token).json(User);
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




// update user
app.put('/user',async (req,res)=>{
    if(req.body.userId === req.query.id){
        try{
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password,4)
            }
            await user.findByIdAndUpdate(req.query.id,{$set:req.body});
            return res.status(200).send("user updated");
        }catch(err){
            return res.status(500).send("server error")
        }          
    }else{
        return res.status(401).send("connot update else user details")
    }
})


// delete user
app.delete('/user',async (req,res)=>{
        try{
            await user.findByIdAndDelete(req.query.id);
            return res.status(200).send("deleted");
        }catch(err){
            return res.status(500).json(err);
        }          
})



// get a user 
app.get('/user',async (req,res)=>{    
        try{
            const User = await user.findById(req.query.id);
            const {password,updatedAt,...others} = User._doc;
            return res.status(200).json(others);
        }catch(err){
            return res.status(500).send("server error")
        }              
})


app.listen(PORT,(err)=>{
    if(err)console.log('Server error',err);
    console.log('server running on port :',PORT);
});
