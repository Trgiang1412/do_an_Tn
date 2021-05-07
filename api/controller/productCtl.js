const Products = require('../model/productModel');


exports.findProducts = async(req, res) => {
    // const producname = req.query.producname
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