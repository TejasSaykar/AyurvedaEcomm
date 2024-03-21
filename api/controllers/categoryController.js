const categoryModel = require("../models/categoryModel");

// Create Category
exports.createCategory = async (req, res) => {
  const name = req.body.name;
  const img = req.body.img;
  try {
    if (!name) {
      return res.json({ message: "Category is requierd!" });
    }

    const existCat = await categoryModel.findOne({
      name,
    });
    if (existCat) {
      return res.json({ message: "Category already present" });
    }

    const newCategory = await new categoryModel({
      name,
      img,
    }).save();
    return res.status(201).json({
      success: true,
      message: "Category created",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while creating the category",
      error,
    });
  }
};

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    return res.status(200).json({
      success: true,
      categoryCount: categories.length,
      message: "Getting all categories",
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while getting the categories",
      error,
    });
  }
};

// Get single category
exports.singleCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the category",
      error,
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryModel.findByIdAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Category updated",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while updating the category",
      error,
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categoryModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Category deleted",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting the category",
      error,
    });
  }
};
