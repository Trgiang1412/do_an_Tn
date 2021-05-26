const express = require('express')
const router = express.Router();
const { findProducts, createProducts, updateProduct, deleteProducts, findProductsId, fillerProduct, addToCart, bag, notBag } = require('../controller/productCtl')

router.route('/cart')
    .get(findProducts)

.post(createProducts)
router.route('/cart/:id')
    .get(findProductsId)
    .put(updateProduct)
    .delete(deleteProducts)
router.route('/filter').get(fillerProduct);
router.route('/productcart').post(addToCart)
router.route('/bag').get(bag)
router.route('/notbag').get(notBag)
module.exports = router