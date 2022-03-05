const express = require('express');

const productRoutes = require('./products/products.routes');
const cartRoutes = require('./cart/cart.routes');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: true}))

router.use('/', productRoutes);
router.use('/', cartRoutes);




module.exports = router;