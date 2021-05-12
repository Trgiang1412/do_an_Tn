module.exports = function Cart(oldCart) {
    this.items = oldCart.items;
    this.totalQty = oldCart.totalQty;
    this.totalPrice = oldCart.totalPrice;


    this.add = function(item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = { item: item, qty: 0, price: 0 };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.price;

    };

    this.generateArray = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr
    };
};


// let cart = null;

// module.exports = class Cart {

//     static save(product) {

//         if (cart === null) {
//             cart = { products: [], totalPrice: 0 };
//         }

//         const existingProductIndex = cart.products.findIndex(p => p.id == product.id); // to check product is existing in cart
//         if (existingProductIndex >= 0) { // exist in cart already
//             const exsitingProduct = cart.products[existingProductIndex];
//             exsitingProduct.qty += 1;
//         } else { //not exist
//             product.qty = 1;
//             cart.products.push(product);
//         }

//         cart.totalPrice += product.price;
//     }

//     static getCart() {
//         return cart;
//     }

//     static delete(productId) {
//         const isExisting = cart.products.findIndex(p => p.id == productId);
//         if (isExisting >= 0) {
//             cart.products.splice(isExisting, 1);
//         }
//     }

// }