const categoryModel = require("../models/categoryModel");
const comboModel = require("../models/comboModel");
const productModel = require("../models/productModel");

// Create Product
exports.createProduct = async (req, res) => {
  try {
    let percentageDiscount;
    if (req.body.price && req.body.offerPrice) {
      percentageDiscount =
        ((req.body.price - req.body.offerPrice) / req.body.price) * 100;
    }

    const product = await new productModel({
      ...req.body,
      prevQty: req.body.quantity,
      discountPrice: percentageDiscount.toFixed(0),
    }).save();

    return res.status(200).json({
      success: true,
      message: "Product is created",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the product",
      error,
    });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const product = await productModel.find({}).populate("category");
    return res.status(200).json({
      success: true,
      message: "Product is getting",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting the products",
      error,
    });
  }
};

// Get products for users
exports.getUserProducts = async (req, res) => {
  try {
    const product = await productModel
      .find({ isCombo: false })
      .populate("category");
    return res.status(200).json({
      success: true,
      message: "Product is getting",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while getting the products",
      error,
    });
  }
};

// Get single product
exports.singleProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel
      .findById({ _id: id })
      .populate("category");
    return res.status(200).json({
      success: true,
      message: "Product is getting",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the single product",
      error,
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body, prevQty: req.body.quantity },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Product updated",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the product",
      error,
    });
  }
};

// Delete controller
exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await productModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Product deleted",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the product",
      error,
    });
  }
};

// Find product by category
exports.productCategoryController = async (req, res) => {
  const slug = req.params.slug;
  try {
    // const category = await categoryModel.findOne({ name: slug });
    const category = await categoryModel.find({
      $or: [{ name: { $regex: slug, $options: "i" } }],
    });
    const products = await productModel.find({ category }).populate("category");
    res.status(201).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error while getting category wise product",
      error,
    });
  }
};

exports.findByProduct = async (req, res) => {
  const slug = req.params.slug;
  try {
    const products = await productModel.find({
      $or: [
        { title: { $regex: slug, $options: "i" } },
        { desc: { $regex: slug, $options: "i" } },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Products found",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

// Create Combo Products
exports.createCombo = async (req, res) => {
  const { title, desc, price, image, products } = req.body;
  try {
    const product = await new comboModel({
      title,
      desc,
      price,
      products,
      image,
    }).save();
    return res.status(200).json({
      success: true,
      message: "Combo products are created",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the combo product",
      error,
    });
  }
};

// Get Combo Products
exports.getCombo = async (req, res) => {
  try {
    const products = await productModel.find({ isCombo: true });
    return res.status(200).json({
      success: true,
      message: "Getting all Combos",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the combos",
      error,
    });
  }
};

// Get single combo
exports.getSingleCombo = async (req, res) => {
  const id = req.params.id;
  try {
    const combo = await comboModel.findById({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Getting the single product",
      combo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the single combo",
      error,
    });
  }
};

// Delete Combo
exports.deleteCombo = async (req, res) => {
  const id = req.params.id;
  try {
    const combo = await comboModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: false,
      message: "Product deleted",
      combo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the combo",
      error,
    });
  }
};

// Search Product
exports.searchProduct = async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const products = await productModel.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { desc: { $regex: keyword, $options: "i" } },
      ],
    });

    // const comboProducts = await comboModel.find({
    //     $or: [
    //         { title: { $regex: keyword, $options: "i" } },
    //         { desc: { $regex: keyword, $options: "i" } }
    //     ]
    // });

    // const filteredProd = [...products, ...comboProducts]

    return res.status(200).json({
      success: false,
      message: "Products getting",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while searching the product",
      error,
    });
  }
};
