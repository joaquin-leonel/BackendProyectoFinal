const express = require('express');

const productRoutes = require('./products/products.routes');
const cartRoutes = require('./cart/cart.routes');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}))

router.use('/products', productRoutes);
router.use('/cart', cartRoutes);




module.exports = router;