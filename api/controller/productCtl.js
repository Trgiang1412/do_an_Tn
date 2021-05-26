const Products = require('../model/productModel');
const Cart = require('../model/cartModel')

exports.findProducts = async(req, res) => {
    const listProduct = await Products.find()

    return res.status(200).json({
        succcess: true,
        listProduct
    })


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
    const producname = req.query
    const listProdust = await Products.find().limit(4)
    const fillterProduct = listProdust.filter(user => {
        let isValid = true;
        for (key in producname) {

            isValid = isValid && user[key] == producname[key]
        }
        return isValid;
    });
    res.status(200).json({
        succcess: true,
        fillterProduct
    })
}


exports.addToCart = (req, res, next) => {
    const addedProduct = Products.findById(req.body.id);
    const a = new Cart(addedProduct)
    reqes.json(a)

}





exports.bag = async(req, res, next) => {
    try {
        const allProduct = await Products.find()
        const allBag = allProduct.filter((item) => {
            return item.category === "balo"
        })
        return res.status(200).json({
            succcess: true,
            allBag
        })
    } catch (error) {
        next(error)
    }
}



exports.notBag = async(req, res, next) => {
    try {
        const allProduct = await Products.find()
        const listnotBag = allProduct.filter((item) => {
            return item.category != "balo"
        })
        return res.status(200).json({
            succcess: true,
            listnotBag
        })
    } catch (error) {
        next(error)
    }
}