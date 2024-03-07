const { uploadBanner, getBanners, deleteBanner } = require("../controllers/uploadBanner");

const router = require("express").Router();

router.post("/upload-banner", uploadBanner);

router.get("/get-banners", getBanners);

router.delete("/delete-banner/:id", deleteBanner);

module.exports = router;