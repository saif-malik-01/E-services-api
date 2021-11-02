const Item = require('../models/items');
const User = require('../models/user');
const Ebook = require('../models/ebook');
module.exports.searchAll=async (req,res)=>{
    try{
        const items=await Item.find({});
        const books=await Ebook.find({});
        
        return res.json({
            items:items,
            Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}