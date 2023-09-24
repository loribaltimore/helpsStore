let { v4: uuidv4  } = require('uuid');
const updateSession = require('../lib/updateSession');
class CartBuilder{
    constructor(currentUser, items, total, toDonate = [],  pool = 0) {
        this.currentUser = currentUser;
        this.items = items;
        this.total = total;
        this.toDonate = toDonate;
        this.pool = pool;
    };
    remove() {
        this.items.sort(function (a, b) {
            return a + b;
        });
        this.items.pop();
    };
    total() {
        return this.items.reduce(function (a, b) {
            return a.price + b.price;
        })
    };
    coin() {
        return (this.items.reduce(function (a, b) {
            return a.price + b.price;
        }) / 2) / 10;
    }
};

class CartItem {
    constructor(name, price, config, img, code, sort = 0, id = uuidv4(), receiptNo = undefined, orderedFrom = undefined ) {
        this.name = name;
        this.price = price;
        this.config = config;
        this.img = img;
        this.code = code;
        this.sort = sort;
        this.id = id;
        this.receiptNo = receiptNo;
        this.orderedFrom = orderedFrom;
    };
    add() {
        this.config.qty += 1;
    };
    sort() {
        this.sort = 1;
    };
};


let createCart = async (currentUserId, item) => {
    let { name, price, img, code, config } = item;
    let newItem = new CartItem(name, price, config, img[0].path, code);
    let newCart = new CartBuilder(currentUserId, [newItem], newItem.price);
   let response = await updateSession(currentUserId, 'cart', newCart)
        .then(data => { return data }).catch(err => console.log(err));
        return response.cart;
    return {};
}

module.exports = {createCart, CartItem, CartBuilder};
