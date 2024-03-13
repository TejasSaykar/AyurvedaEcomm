const express = require("express");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");
const { getProducts, createProduct, singleProduct, deleteProduct, updateProduct, productCategoryController, findByProduct, createCombo, getCombo, getSingleCombo, deleteCombo, searchProduct, getUserProducts } = require("../controllers/productController");

const router = express.Router();

router.get("/all-products", getProducts); // verifyToken, 

router.post("/create-product", createProduct); // verifyTokenAdmin, 

router.get("/get-user-product", getUserProducts); // verifyTokenAdmin, 


router.get("/single-product/:id", singleProduct); // verifyToken, 

router.delete("/delete-product/:id", deleteProduct);

router.put("/update-product/:id", updateProduct);

router.get("/product-category/:slug", productCategoryController);

router.get("/find-by-product/:slug", findByProduct);

// Create Combo
router.post("/create-combo", createCombo);

// Get Combo Products
router.get("/combos", getCombo);

// Get single Combo
router.get("/combo/:id", getSingleCombo);

// Delete Combo
router.delete("/combo/:id", deleteCombo);


// Search Products
router.post("/search/:keyword", searchProduct);

module.exports = router;