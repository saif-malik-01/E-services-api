const Item = require('../models/items');
const User = require('../models/user');
const Ebook = require('../models/ebook');
module.exports.addToItemCart=async (req,res)=>{
    const {user} = req.body;
    const {itemId} = req.params; 
    if(!user)
    {
        return res.status(405).json('Login First');
    }
    user = await User.findById(user.id);
    let item = item.findById(itemId);
    if(!item){
        return res.status(405).json('Item does not exist');
    }
    user.cartItem.push(item._id);
    await user.save();
    return res.status(200).json('Item added successfully');

}

module.exports.addToCartBooks=async (req,res)=>{
    const {user} = req.body;
    const {bookId} = req.params; 
    if(!user)
    {
        return res.status(405).json('Login First');
    }
    user = await User.findById(user.id);
    let ebook = Ebook.findById(bookId);
    if(!ebook){
        return res.status(405).json('Ebook does not exist');
    }
    user.cartBooks.push(item._id);
    await user.save();
    return res.status(200).json('Ebook added successfully');

}

module.exports.checkOutCart=async (req, res) => {
    const {user} = req.body;
    if(!user)
    {
        return res.status(405).json('Login First');
    }
    user = await User.findById(user.id);
    await user.populate('cartBooks').populate('cartItem');
    let cost=0n;
    for(book of cartBooks)
    {
        cost+=BigInt(book.price);
    }
    for(item of itemCart)
    {
        cost+=BigInt(item.price);
    }
    return res.json({
        cost: cost,
        cartBooks: user.cartBooks,
        cartItem: user.cartItem
    });
}

