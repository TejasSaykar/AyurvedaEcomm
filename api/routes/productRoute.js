const express = require("express");
const { verifyToken, verifyTokenAdmin } = require("../middlewares/verifyToken");
const { getProducts, createProduct, singleProduct, deleteProduct, updateProduct, productCategoryController } = require("../controllers/productController");

const router = express.Router();

router.get("/all-products", getProducts); // verifyToken, 

router.post("/create-product", createProduct); // verifyTokenAdmin, 

router.get("/single-product/:id", singleProduct); // verifyToken, 

router.delete("/delete-product/:id", deleteProduct);

router.put("/update-product/:id", updateProduct);

router.get("/product-category/:slug", productCategoryController);

module.exports = router;