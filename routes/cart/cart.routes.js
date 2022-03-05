const express = require('express');
const { cartList } = require('../../data/cartApi');

const router = express.Router();

router.get( '/cart', (req, res) => {
    return res.send(cartList);

})

router.get( '/products/:id', (req, res) => {
    const { id } = req.params;

    if(id) {
        let response = cartList.find(e => e.id === id);
        
        return !response ? res.status(400).send({msn: 'object not found'}) : res.send(response);
    }

})

router.post('/cart', (req, res) => {
    const { name, description, price, img, cod, stock } = req.body;

    const findId = cartList.map(item => item.id); 
    let newId; 
    if(findId.length == 0) newId = 1; 
    else newId = Math.max.apply(null, findId) + 1;

    const newCart = {
        id: newId,
        name: name,
        description: description,
        price: price,
        img: img,
        cod: cod,
        stock: stock
    };

    cartList.push(newCart);

    res.status(200).send('El producto se cargo satisfactoriamente');
})

router.put('/cart/:id', (req, res) => {
    const { params: { id }, body: { name, price, img, stock, cod} } = req
  
    if (!id) {
        res.status(400).send('Id not found');
    }
    const cartIndex = cartList.findIndex(e => e.id === +id);
    if (!cartIndex) return res.status(404).json({ success: false, error: `Producto no encontrado`});
    const newProduct = {
      ...cartList[cartIndex],
      name,
      price,
      img,
      stock,
      cod
    };
    cartList[cartIndex] = newProduct;
    return res.json({ success: true, result: newProduct});

    
})

router.delete('/cart/:id', (req, res) => {
    const { id } = req.params;

    if(!id) return res.status(404).send('Id not found');

    const cartId = cartList.findIndex( e => e.id === id);

    cartList.splice(cartId, 1);

    return res.status(200).send('Id eliminado correctamente');
})

module.exports = router;