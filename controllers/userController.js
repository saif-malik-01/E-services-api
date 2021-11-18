const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');

// update user
router.put('/:id',async (req,res)=>{
    if(req.body.userId === req.params.id){
        try{
            if(req.body.password){
                req.body.password = await bcrypt.hash(req.body.password,4)
            }
            await user.findByIdAndUpdate(req.params.id,{$set:req.body});
            return res.status(200).send("user updated");
        }catch(err){
            return res.status(500).send("server error")
        }          
    }else{
        return res.status(401).send("connot update else user details")
    }
})


// delete user
router.delete('/:id',async (req,res)=>{
        try{
            await user.findByIdAndDelete(req.params.id);
            return res.status(200).send("deleted");
        }catch(err){
            return res.status(500).json(err);
        }          
})



// get a user 
router.get('/:id',async (req,res)=>{    
        try{
            const User = await user.findById(req.params.id);
            const {password,updatedAt,...others} = User._doc;
            return res.status(200).json(others);
        }catch(err){
            return res.status(500).send("server error")
        }              
})


module.exports = router;
