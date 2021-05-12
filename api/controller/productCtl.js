const Products = require('../model/productModel');
const Cart = require('../model/cartModel')

exports.findProducts = async(req, res) => {
    const listProduct = await Products.find()
        // console.log(listProduct)
        // if (producname) {
        //     const filterName = listProduct.filter((item) => {
        //         return item.producname.toLowerCase().indexOf(producname.toLowerCase()) !== -1
        //     })
        //     return res.status(200).json({
        //         succcess: true,
        //         filterName
        //     })
        // } else {
    return res.status(200).json({
            succcess: true,
            listProduct
        })
        // }

}
exports.createProducts = async(req, res) => {
    const { producname, imgages, total, detail, count } = req.body
    try {
        const createProduct = await Products.create({ producname, imgages, total, detail, count })
        res.status(200).json({
            succcess: true,
            createProduct
        })
    } catch (error) {
        next(error)
    }
}

exports.updateProduct = async(req, res) => {
    const id = req.params.id
    const { producname, imgages, total, detail, count } = req.body
    try {
        const updateProduct = await Products.updateOne({ id: User._id, producname, imgages, total, detail, count })
        res.status(200).json({
            succcess: true,
            updateProduct
        })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteProducts = async(req, res) => {
    const id = req.params.id
    try {
        const deleteProduct = await Products.deleteOne({ id: _id })
        res.status(200).json({
            succcess: true,
            deleteProduct
        })
    } catch (error) {
        console.log(error)
    }
}

exports.findProductsId = async(req, res, next) => {
    const id = req.params.id
    try {
        const productId = await Products.findById(id)
        res.status(200).json({
            succcess: true,
            productId
        })
    } catch (error) {
        console.log(error)
    }
}

exports.fillerProduct = async(req, res, next) => {
    const producname = req.query.producname
    const category = req.query.category
    try {
        const listProduct = await Products.find()

        if (producname) {
            const filterName = listProduct.filter((item) => {
                return item.producname.toLowerCase().indexOf(producname.toLowerCase()) !== -1
            })
            return res.status(200).json({
                succcess: true,
                filterName
            })
        } else if (category) {
            const filterCategory = listProduct.filter((item) => {
                return item.category.toLowerCase().indexOf(category.toLowerCase()) !== -1
            })
            res.status(200).json({
                succcess: true,
                filterCategory
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.prductCart = async(req, res, next) => {
    const productId = req.params.id
    const cart = new Cart(req.session.cart ? req.session.cart : { items: {} });

    try {
        await Products.findById(productId, function(err, product) {
            if (err) {
                return res.redircet('/shop')
            }
            cart.add(product, product.id)
            req.session.cart = cart;
            console.log(req.session.cart);
            return res.redircet('/shop')

        })
    } catch (error) {

    }

}

// exports.addToCart = (req, res, next) => {
//     const addedProduct = Products.findById(req.body.id)[0];
//     Cart.save(addedProduct);
//     res.redirect('/cart');
// }