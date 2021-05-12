const express = require('express')
const router = express.Router();
const { findProducts, createProducts, updateProduct, deleteProducts, findProductsId, fillerProduct, prductCart } = require('../controller/productCtl')

router.route('/cart')
    .get(findProducts)

.post(createProducts)
router.route('/cart/:id')
    .get(findProductsId)
    .put(updateProduct)
    .delete(deleteProducts)
router.route('/filter').get(fillerProduct);
router.route('/productcart/:productId').get(prductCart)
module.exports = router