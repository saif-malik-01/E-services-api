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

module.exports.searchAllBooks=async (req,res)=>{
    try{
        // const items=await Item.find({});
        const books=await Ebook.find({});
        
        return res.json({
            // items:items,
            Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}


module.exports.searchAllItems=async (req,res)=>{
    try{
        const items=await Item.find({});
        // const books=await Ebook.find({});
        
        return res.json({
            items:items
            // Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}


module.exports.searchItemCategory= async(req,res)=>{
    try{
        const items=await Item.find({
            category:req.body.type
        });
        // const books=await Ebook.find({});
        
        return res.json({
            items:items
            // Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}


module.exports.searchItemCategoryCompany= async (req,res)=>{
    try{
        const items=await Item.find({
            category:req.body.type,
            company:req.body.company
        });
        // const books=await Ebook.find({});
        
        return res.json({
            items:items
            // Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}

module.exports.searchItemCategoryRanged = async function (req, res) {
    const {maxPrice,minPrice} = req.body;
    try{
        const items=await Item.find({
            category:req.body.type,
            price: { $lte: maxPrice || 1000000000, $gte: minPrice || 0 }
        });
        // const books=await Ebook.find({});
        
        return res.json({
            items:items
            // Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}


module.exports.searchBookCategoryRanged = async function (req, res) {
    const {maxPrice,minPrice} = req.body;
    try{
        const books=await Ebook.find({
            category:req.body.type,
            price: { $lte: maxPrice || 1000000000, $gte: minPrice || 0 }
        });
        // const books=await Ebook.find({});
        
        return res.json({
            ebooks:books
            // Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}

module.exports.searchBookCategory = async function (req, res) {
    try{
        const books=await Ebook.find({
            category:req.body.type
        });
        // const books=await Ebook.find({});
        
        return res.json({
            ebooks:books
            // Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}


module.exports.searchBookAuthor = async function (req, res) {
    try{
        const books=await Ebook.find({
            author:req.body.author
        });
          
        return res.json({
            ebooks:books
            // Ebooks:books
        });
    }
    catch(err) {
        console.log(err);
        return res.status(404).json('internal server error');
    }
}



