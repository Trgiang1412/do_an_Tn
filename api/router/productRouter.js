const express = require('express')
const router = express.Router();
const { findProducts, createProducts, updateProduct, deleteProducts, findProductsId } = require('../controller/productCtl')

router.route('/cart')
    .get(findProducts)
    .post(createProducts)
router.route('/cart/:id')
    .get(findProductsId)
    .put(updateProduct)
    .delete(deleteProducts)
module.exports = router