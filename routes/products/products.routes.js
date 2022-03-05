const express = require('express');
const { productsList } = require('../../data/productsApi');

const router = express.Router();

router.get( '/products', (req, res) => {
    return res.send(productsList);

})

router.get( '/cart/:id', (req, res) => {
    const { id } = req.params;

    if(id) {
        let response = productsList.find(e => e.id === id);
        
        return !response ? res.status(400).send({msn: 'object not found'}) : res.send(response);
    }

})

router.post('/products', (req, res) => {
    const { name, description, price, img, cod, stock } = req.body;

    const findId = productsList.map(item => item.id); 
    let newId; 
    if(findId.length == 0) newId = 1; 
    else newId = Math.max.apply(null, findId) + 1;

    const newProduct = {
        id: newId,
        name: name,
        description: description,
        price: price,
        img: img,
        cod: cod,
        stock: stock
    };

    productsList.push(newProduct);

    res.status(200).send('El producto se cargo satisfactoriamente');
})

router.put('/products/:id', (req, res) => {
    const { params: { id }, body: { name, price, img, stock, cod} } = req
  
    if (!id) {
        res.status(400).send('Id not found');
    }
    const productIndex = productsList.findIndex(e => e.id === +id);
    if (!productIndex) return res.status(404).json({ success: false, error: `Producto no encontrado`});
    const newProduct = {
      ...productsList[productIndex],
      name,
      price,
      img,
      stock,
      cod
    };
    productsList[productIndex] = newProduct;
    return res.json({ success: true, result: newProduct});

    
})

router.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    if(!id) return res.status(404).send('Id not found');

    const productId = productsList.findIndex( e => e.id === id);

    productsList.splice(productId, 1);

    return res.status(200).send('Id eliminado correctamente');
})

module.exports = router;