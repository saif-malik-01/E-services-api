const express=require('express');
const router=express.Router();



const cartController=require('../controllers/cartController');

router.post('/addItem/:id',cartController.addToItemCart);
router.post('/addBook/:id',cartController.addToCartBooks);
router.post('/checkOut',cartController.checkOutCart);
router.post('/deleteAllBooks',cartController.deleteAllBooks);
router.post('/deleteAllItems',cartController.deleteAllItems);
router.post('/setQuantityItem/:id',cartController.setQuantityItem);
router.post('/setQuantityBook/:id',cartController.setQuantityBook);
// router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports=router;