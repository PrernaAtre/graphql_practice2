const { convertId } = require("../lib/commonMethod");
const Product = require("./products.schema");
const mongoose = require("mongoose");

async function _findProduct(id)
{
    try
    {
        return await Product.findById(convertId(id)).populate('user');
    }
    catch(err)
    {
        console.log("err while fetching product----", err);
    }
}

async function _findFilteredProduct(id)
{
    try
    {
        return await Product.find(id).populate('user');
    }
    catch(err)
    {
        console.log("error while fetching filtered products---", err);
    }
}

async function getAllProducts()
{
    try
    {
        return await _findFilteredProduct({});
    }
    catch(err)
    {
        console.log("err while fetching products------",err);
    }
}

async function getProductsByUser(id)
{
    try
    {
        const newProducts = await _findFilteredProduct({user : convertId(id)});
        return newProducts;
    }
    catch(err)
    {
        console.log("err while fetching products by user------",err);
    }
}

async function getProduct(id)
{
    try
    {
        return _findProduct(id);
    }
    catch(err)
    {
        console.log("err while getting product--------", err);
    }
}

async function createProduct(data)
{
    try
    {
        const newProduct = new Product(data);
        await newProduct.save();
        return await getProduct(newProduct._id);
    }
    catch(err)
    {
        console.log("error while craetion product", err);
    }
}

async function updateProduct(id, data)
{
    try
    {
        const updatedProduct = await Product.findByIdAndUpdate(convertId(id),
        {
            name : data.name,
            description : data.description,
            price : data.price
        },{new : true})
        return await getProduct(updatedProduct._id);
    }
    catch(err)
    {
        console.log("error while updatating product", err);
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    getProductsByUser,
    updateProduct
}