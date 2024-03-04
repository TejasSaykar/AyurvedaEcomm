const { createCategory, getCategories, updateCategory, deleteCategory, singleCategory } = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/create-category", createCategory);

router.get("/get-categories", getCategories);

router.put("/update-category/:id", updateCategory);

router.delete("/delete-category/:id", deleteCategory);

router.get("/single-category/:id", singleCategory);


module.exports = router;