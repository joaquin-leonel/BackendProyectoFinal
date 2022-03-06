const express = require('express');
const { productsList, getAll, getById, addProduct, updateByIndex, deleteByIndex } = require('../../data/productsApi');

const router = express.Router();

router.get( '/', (req, res) => {
    return res.send(getAll());

})

router.get( '/:id', (req, res) => {
    const { id } = req.params;
    if(id) {   
        let response = getById(id);
        return !response ? res.status(400).send({msn: 'object not found'}) : res.send(response);
    }

})

router.post('/', (req, res) => {
    const { name, description, price, img, cod, stock } = req.body;
    addProduct(name, description, price, img, cod, stock);
    res.status(200).send('El producto se cargo satisfactoriamente');
})

router.put('/:id', (req, res) => {
    const { params: { id }, body: { name, description, price, img, cod, stock} } = req
  
    if (!id) {
        res.status(400).send('Id not found');
    }
    const productIndex = productsList.findIndex(e => e.id === id);
    if (productIndex == -1)
        return res.status(404).json({ success: false, error: `Producto no encontrado`});  

    const newProduct = updateByIndex(productIndex, name, description, price, img, cod, stock);
    return res.json({ success: true, result: newProduct});   
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if(!id) return res.status(404).send('Id not found');

    const productIndex = productsList.findIndex( e => e.id === id);

    if (productIndex == -1)
    return res.status(404).json({ success: false, error: `Producto no encontrado`});  

    deleteByIndex(productIndex);

    return res.status(200).send('Id eliminado correctamente');
})

module.exports = router;