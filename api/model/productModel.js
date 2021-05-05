const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema;

const product = new ProductSchema({
    producname: {
        type: String,
        require: true
    },
    imgages: {
        type: String,
        require: true,
    },
    total: {
        type: Number,
        require: true,
    },
    detail: {
        type: String,
        require: true,
    },
    count: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    }
})
const products = mongoose.model('products', product);

module.exports = products