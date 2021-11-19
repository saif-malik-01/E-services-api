const express=require('express');
const router =express.Router();


console.log('router started');
// router.get('/',homeController.home);

 

router.use('/cart',require('./cart'))

// router.use('/course',require('./course'));

// router.use('/event',require('./event'));

// router.use('/user',require('./users'));

// router.use('/comments',require('./cart'));
//for any further routes,access from here
//router.use('/routerName',require('./routerFile));
// router.use('/editor',require('./event'));
module.exports = router;
