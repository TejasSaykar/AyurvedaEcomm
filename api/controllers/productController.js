const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");


// Create Product
exports.createProduct = async (req, res) => {
    try {
        const product = await new productModel({ ...req.body }).save();
        return res.status(200).json({
            success: true,
            message: "Product is created",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating the product",
            error
        })
    }
}



// Get all products
exports.getProducts = async (req, res) => {
    try {
        const product = await productModel.find({}).populate('category');
        return res.status(200).json({
            success: true,
            message: "Product is getting",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while getting the products",
            error
        })
    }
}


// Get single product
exports.singleProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findById({ _id: id }).populate('category');
        return res.status(200).json({
            success: true,
            message: "Product is getting",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting the single product",
            error
        })
    }
}


// Update Product
exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findByIdAndUpdate({ _id: id }, { $set: req.body }, { new: true });
        return res.status(200).json({
            success: true,
            message: "Product updated",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating the product",
            error
        })
    }
}



// Delete controller
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await productModel.findByIdAndDelete({ _id: id });
        return res.status(200).json({
            success: true,
            message: "Product deleted",
            product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting the product",
            error
        })
    }
}


// Find product by category
exports.productCategoryController = async (req, res) => {
    const slug = req.params.slug
    try {
        // const category = await categoryModel.findOne({ name: slug });
        const category = await categoryModel.find({
            $or: [{ name: {$regex:slug, $options:'i'}}]
        })
        const products = await productModel.find({ category }).populate('category');
        res.status(201).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error while getting category wise product",
            error
        })

    }
}