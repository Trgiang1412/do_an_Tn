const express = require('express')
const router = express.Router();
const { findProducts, createProducts, updateProduct, deleteProducts } = require('../controller/productCtl')

router.route('/cart')
    .get(findProducts)
    .post(createProducts)
router.route('/cart/:id')
    .put(updateProduct)
    .delete(deleteProducts)
module.exports = router