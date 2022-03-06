
let productsList = [
    {   
        id: '1',
        name: 'procesador intel i7',
        description: 'procesador de alto rendimiento intel',
        cod: 0,
        img: 'https://www.trendit.com.ar/Temp/App_WebSite/App_PictureFiles/Items/BX80677I77700T_800.jpg',
        price: 70000,
        stock: 10
    },
    {   
        id: '2',
        name: 'memoria ram 16 GB',
        description: 'memoria de 16 gb de ram compatible con dual channel',
        cod: 0,
        img: 'https://www.trendit.com.ar/Temp/App_WebSite/App_PictureFiles/Items/BX80677I77700T_800.jpg',
        price: 70000,
        stock: 10
    },
    {   
        id: '3',
        name: 'disco rigido 2TB',
        description: 'disco rigido de almacenamiento de 2 tb',
        cod: 0,
        img: 'https://www.trendit.com.ar/Temp/App_WebSite/App_PictureFiles/Items/BX80677I77700T_800.jpg',
        price: 70000,
        stock: 10
    },
    {   
        id: '4',
        name: 'placa de video Gforce',
        description: 'placa de video Gforce alto rendimiento',
        cod: 0,
        img: 'https://www.trendit.com.ar/Temp/App_WebSite/App_PictureFiles/Items/BX80677I77700T_800.jpg',
        price: 70000,
        stock: 10
    },
    
];

function addProduct(name, description, price, img, cod, stock){
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
}

function getById(id){
    return productsList.find(e => e.id === id);
}

function getAll(){
    return productsList;
}

function updateByIndex(productIndex, name, description, price, img, cod, stock){
    const newProduct = {
        ...productsList[productIndex],
        name: name,
        description: description,
        price: price,
        img: img,
        cod: cod,
        stock: stock,
    };
    productsList[productIndex] = newProduct;
    return newProduct;
}

function deleteByIndex(productIndex){
    productsList.splice(productIndex, 1);
}

module.exports = {
    productsList,
    getAll,
    getById,
    addProduct,
    updateByIndex,
    deleteByIndex,
};