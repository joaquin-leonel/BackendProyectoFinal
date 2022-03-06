const { getById } = require("./productsApi");

const cartContainer ={
    lastId:0,
    carts:new Map(),
};

class Cart {
    constructor() {
        cartContainer.lastId+=1;
        cartContainer.carts.set(cartContainer.lastId, this), 
        this.id = cartContainer.lastId;
        this.timeStamp = Date.now(); 
        this.productos = new Map();
    }
    deleteAll(){
        this.productos = {};
    }
    getAll(){
        return this.productos;
    }
    add(productId){    
        if (!this.productos.has(productId)){
            this.productos.set(productId, getById(productId));
            let product = this.productos.get(productId);
            product.quantity = 1;
            product.timeStamp = Date.now();
        } else {
            let product = this.productos.get(productId);
            product.quantity += 1;
            product.timeStamp = Date.now();
        }
    }
    delete(productId){
        if (this.productos.has(productId)){
            this.productos.delete(productId);
        }
    }

}

function addCart(){
    let cart = new Cart();
    cartContainer.carts.set(cart.id, Cart);
    return cart.id; 
}

function deleteCart(cartId){
    const cart = cartContainer.carts.get(cartId);
    cart.deleteAll;
    cartContainer.carts.delete(cartId);
}

function getFromCart(cartId){
    const cart = cartContainer.carts.get(cartId);
    return cart.getAll();
}


function addToCart(cartId, productId){
    const cart = cartContainer.carts.get(cartId);
    cart.add(productId);
}

function deleteFromCart(cartId, productId){
    const cart = cartContainer.carts.get(cartId);
    cart.delete(productId);
}



module.exports = {
    cartContainer,
    Cart,
    addCart,
    deleteCart,
    getFromCart,
    addToCart,
    deleteFromCart,  
};