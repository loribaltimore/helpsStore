let { createCart, CartItem } = require('lib/createCart.js');
import updateSession from 'lib/updateSession'

module.exports.addToCart = async (currentUserId, cart, item) => {
    let { name, price, img, code, config } = item;
    if (cart === undefined) {
        cart = await createCart(currentUserId, item).then(data => { return data }).catch(err => console.log(err));
        return cart;
    } else {
        console.log('THIS IS QTY', config.qty)
        config === undefined ?
            config = {qty: 1} : config = config;
        let newItem = undefined;
        let cartItems = cart.items.map(x => x.name);
        if (cartItems.indexOf(name) === -1) {
            newItem = new CartItem(name, price, config, img[0].path, code);
            cart.items.push(newItem);  
        } else {
            console.log('THIS IS QTY');
            console.log(config.qty);
            cart.items[cartItems.indexOf(name)].config.qty
                +=
                name !== 'Coin' ?
                    1 : config.qty;
        };

        if (name !== 'Coin') {
            cart.total += price;
        } else {
            cart.total += (price * qty);
        };

        cart = await updateSession(currentUserId, 'cart', cart)
            .then(data => { return data }).catch(err => console.log(err));
        return cart.cart;
    }
};

module.exports.removeFromCart = async (cart, item) => {
    if (cart.items[cartItems.indexOf(item.name)].qty === 0) {
        return ''
    }
    let cartItems = cart.items.map(x => x.name);
    let currentItem = cart.items[cartItems.indexOf(item.name)]
    currentItem.config.qty -= 1;
    cart.total -= item.price;
    if (item.name === 'Coin') {
        cart.coin.qty = Math.abs(cart.coin.qty - 1);
        if (cart.toDonate.length > ((cart.total / 2) / 5) - (item.qty * 5)) {
            cart.toDonate.pop();
        }
    };
    
    if (currentItem.config.qty === 0) {
        currentItem.sort = 1;
        cart.items.sort(function (a, b) {
            return a.sort - b.sort
        })
        console.log(cart.items);
        cart.items.pop();
        console.log(cart.items);
    };
    cart = await updateSession('cart', cart)
        .then(data => { return data }).catch(err => console.log(err));
    return cart.data.cart;
};

module.exports.updateCoin = async (currentUserId, cart, orgs) => {

    console.log('UPDATING COIN');
    console.log(cart, orgs);

    if ((orgs.length * 2) - (cart.total / 10) > 0) {
       let coin = { name: 'Coin', price: 5, img: [{path: ''}], code: 'price_1MRIq1JdX2WdfgCJLpJ9fD61', config: { qty: (orgs.length * 2) - (cart.total / 10)}};
       let newItem = new CartItem(coin.name, coin.price, coin.config, coin.img[0].path, coin.code);
    cart.items.push(newItem);
    }
    for (let i = 0; i < orgs.length; i++){
                    orgs[i].coinTotal = 2;
                cart.toDonate.push(orgs[i]);
    }
    console.log('THIS IS CART');
    console.log(cart);

    cart = await updateSession(currentUserId, 'cart', cart)
        .then(data => { return data }).catch(err => console.log(err));
    return cart.data.cart;
};

module.exports.updatePool = async (cart, amt) => {
    cart.pool += amt;
    
    cart = await updateSession('cart', cart)
    .then(data => { return data }).catch(err => console.log(err));
return cart.data.cart;
};

// amount for each donation will have to be a static 10 or dynamic value
// if want to be dynamic then change the charityDonate component to allow for multiple coins 
//     to be put on one org 
//     then each resource in queue will have different value
//     DO this and add each purchase to customers Profile => total donated, orgs donated to,
//     level of membership, etc..


//FIX ADDING ITEMS TO CART FROM HOME PAGE AND RENDERING IN CART DROP DOWN
//poolprompt

// update cart with above function to reflect new coin amount
// after pressing coin icon to choose charity
// then program pool request and pool add


// undonate has to be reflected;